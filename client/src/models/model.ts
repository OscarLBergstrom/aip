import { useFetch } from "../hooks/useFetch";
import { Method } from "axios";

interface Track {
  title: string;
  artist: string;
}
interface User {
  code: string;
  token: string;
  email: string;
  username: string;
  id: string;
}

export default class HaipModel {
  botResponse: string;
  urlResponse: string;
  playlist: string[];
  playlistID: string;
  loggedIn: boolean;
  user: User;

  constructor() {
    this.botResponse = "";
    this.urlResponse = "";
    this.playlist = [];
    this.playlistID = "";
    this.loggedIn = false;
    this.user = {
      code: "",
      token: "",
      email: "",
      username: "",
      id: "",
    };
  }

  formatBotResponse(botMessage: string) {
    const tracks: Track[] = [];

    botMessage = botMessage.trim();
    const arr = botMessage.split(/\d+\. /);

    for (let i = 1; i < arr.length; i++) {
      const trackInfo = arr[i].split("-");

      const track: Track = {
        title: trackInfo[0].trim(),
        artist: trackInfo[1].trim(),
      };
      console.log(track);

      tracks.push(track);
    }

    return tracks;
  }

  createPlaylist = async (playlistName: string) => {
    try {
      const data = await useFetch({
        url: `http://localhost:3001/api/playlist`,
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          token: this.user.token,
          userID: this.user.id,
          playlistName: playlistName,
        },
      });
      this.playlistID = data.token.id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getTrackIDs = async (response: Track[]) => {
    const trackIDs = [];

    for (let i = 0; i < response.length; i++) {
      const searchResult = await this.getSearchResult(
        response[i].title,
        response[i].artist
      );
      trackIDs.push(searchResult);
    }

    return trackIDs;
  };

  addTracks = async () => {
    try {
      const data = await useFetch({
        url: `http://localhost:3001/api/tracks`,
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          playlistID: this.playlistID,
          uris: this.playlist,
          token: this.user.token,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  submitBotRequest = async (
    userMessage: string,
    playlistName: string,
    numberOfTracks: number
  ) => {
    try {
      const data = await useFetch({
        url: "http://localhost:3001/api/chatbot",
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: { message: userMessage, numberOfTracks: numberOfTracks },
      });
      this.botResponse = data.botResponse;

      // format the bot response 
      const formattedResponse = this.formatBotResponse(data.botResponse);

      // gets the playlist in an array (the array consists of the tracks' Spotify URI)
      this.playlist = await this.getTrackIDs(formattedResponse);

      // create a new playlist
      await this.createPlaylist(playlistName);

      // add the tracks to the playlist
      this.addTracks();
    } catch (error) {
      console.error("Error:", error);
      this.botResponse =
        "An error occurred while communicating with the chatbot.";
    }
    console.log("ChatBot:\n", this.botResponse);
  };

  /* Login */
  handleLogin = async () => {
    function generateCodeVerifier(length: number) {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    async function generateCodeChallenge(codeVerifier: string) {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    try {
      const generated_verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(generated_verifier);

      localStorage.setItem("verifier", generated_verifier);
      const apiUrl = `http://localhost:3001/api/login?challenge=${encodeURIComponent(
        challenge
      )}`;

      const data = await useFetch({
        url: apiUrl,
        method: "GET" as Method,
      });

      this.urlResponse = data.urlResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getUserDetails = async () => {
    if (!Object.values(this.user).some((v) => v)) {
      this.getUserCode();
      await this.getUserToken();
      await this.getUserProfile();
      this.loggedIn = true;

      console.log("user: ", this.user);
    }
  };

  /* Get user code param */
  getUserCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code_param = params.get("code");
    if (typeof code_param === "string") {
      this.user.code = code_param;
    }
  };

  /* Get user token */
  getUserToken = async () => {
    const verifier = localStorage.getItem("verifier");
    if (typeof this.user.code === "string" && typeof verifier === "string") {
      try {
        const data = await useFetch({
          url: `http://localhost:3001/api/token`,
          method: "POST" as Method,
          headers: {
            "Content-Type": "application/json",
          },
          body: { code: this.user.code, verifier: verifier },
        });
        this.user.token = data.token;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  /* Get email and username of user */
  getUserProfile = async () => {
    try {
      const data = await useFetch({
        url: `http://localhost:3001/api/profile?token=${encodeURIComponent(
          this.user.token
        )}`,
        method: "GET" as Method,
      });
      this.user.id = data.profile.id;
      this.user.email = data.profile.email;
      this.user.username = data.profile.display_name;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getSearchResult = async (track: string, artist: string) => {
    try {
      const data = await useFetch({
        url: `http://localhost:3001/api/search?token=${encodeURIComponent(
          this.user.token
        )}&track=${encodeURIComponent(track)}&artist=${encodeURIComponent(
          artist
        )}`,
        method: "GET" as Method,
      });
      return data.search.tracks.items[0].uri;
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

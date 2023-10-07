import { useFetch } from "../hooks/useFetch";
import { Method } from "axios";
import { User, Track, Playlist } from "../assets/utils/types";
import temp_logo from "../assets/images/temp_logo.png";

export default class HaipModel {
  observers: ((data: HaipModel) => void)[] = [];
  botResponse: string;
  urlResponse: string;
  playlist: string[];
  playlistID: string;
  playlistName: string;
  loggedIn: boolean;
  user: User;
  playlists: Playlist[];
  tracks: Track[];

  constructor() {
    this.botResponse = "";
    this.urlResponse = "";
    this.playlist = [];
    this.playlistID = "";
    this.playlistName = "";
    this.loggedIn = false;
    this.user = {
      code: "",
      token: "",
      email: "",
      username: "",
      id: "",
    };
    this.playlists = [];
    this.tracks = [];
  }

  addObserver(obs: (data: HaipModel) => void): void {
    this.observers.push(obs);
  }

  removeObserver(obs: (data: HaipModel) => void): void {
    const index = this.observers.indexOf(obs);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => observer(this));
  }

  formatBotResponse(botMessage: string) {
    this.tracks = [];
    botMessage = botMessage.trim();
    const arr = botMessage.split(/\d+\. /);

    for (let i = 1; i < arr.length; i++) {
      const trackInfo = arr[i].split("-");

      const track: Track = {
        title: trackInfo[0].trim(),
        artist: trackInfo[1].trim(),
      };
      console.log(track);

      this.tracks.push(track);
    }
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
      this.notifyObservers();
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
      await useFetch({
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
      this.setPlaylistName(playlistName);
      console.log(this.user.token);
      const data = await useFetch({
        url: "http://localhost:3001/api/chatbot",
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: { message: userMessage, numberOfTracks: numberOfTracks },
      });
      this.botResponse = data.botResponse;
      this.formatBotResponse(this.botResponse);
      this.notifyObservers();
    } catch (error) {
      console.error("Error:", error);
      this.botResponse =
        "An error occurred while communicating with the chatbot.";
    }
    console.log("ChatBot:\n", this.botResponse);
  };

  setPlaylistName = (name: string) => {
    this.playlistName = name;
  };

  submitPlaylistRequest = async () => {
    try {
      // get the playlist in an array (the array consists of the tracks' Spotify URI)
      this.playlist = await this.getTrackIDs(this.tracks);

      // create a new playlist
      await this.createPlaylist(this.playlistName);

      // add the tracks to the playlist
      this.addTracks();
    } catch (error) {
      console.error("Error: ", error);
    }
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
      this.notifyObservers();
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
      this.notifyObservers();
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
        this.notifyObservers();
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
      this.notifyObservers();
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

  getPlaylists = async () => {
    try {
      const data = await useFetch({
        url: `http://localhost:3001/api/getplaylists?token=${encodeURIComponent(
          this.user.token
        )}&userID=${encodeURIComponent(
          this.user.id
        )}`,
        method: "GET" as Method,
      });

      this.playlists = [];
      const items = data.playlists.items;
      for (let i = 0; i < items.length; i++) {
        let image_url = temp_logo;
        if (items[i].images.length) {
          image_url = items[i].images[0].url;
        }
        const playlist: Playlist = {
          id: items[i].id,
          name: items[i].name,
          image_url: image_url,
        };
        this.playlists.push(playlist);
      }
      console.log("playlists", this.playlists);
      this.notifyObservers();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  logout = () => {
    this.loggedIn = false;
    this.user = {
      code: "",
      token: "",
      email: "",
      username: "",
      id: "",
    };
    this.notifyObservers();
  }

  selectPlaylist = (playlistID: string) => {
    this.playlistID = playlistID;
    console.log("playlist id", this.playlistID);
  }
}

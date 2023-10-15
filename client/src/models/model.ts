import { useFetch } from "../hooks/useFetch";
import { Method } from "axios";
import { User, Track, Playlist } from "../utils/types";
import temp_logo from "../assets/images/temp_logo.png";
import * as forge from 'node-forge';

export default class HaipModel {
  observers: ((data: HaipModel) => void)[] = [];
  botResponse: string;
  urlResponse: string;
  playlist: string[];
  playlistDB: string[];
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
    this.playlistDB = [];
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

  /**
   * Formats the bot response from a string message to a tracks array with artist and title
   * @param botMessage The string message to format.
   */
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

      this.tracks.push(track);
    }
  }

  /**
   * For every track, search for the track on Spotify and get back the Spotify track ID for the first track in the search result.
   * @param tracks The track array.
   * @returns
   */
  getTrackIDs = async (tracks: Track[]) => {
    const trackIDs = [];

    for (let i = 0; i < tracks.length; i++) {
      const searchResult = await this.getSearchResult(
        tracks[i].title,
        tracks[i].artist
      );
      if (searchResult) {
        trackIDs.push(searchResult);
      }
    }

    return trackIDs;
  };

  /**
   * Add all the tracks to the previously created Spotify playlist.
   */
  addTracks = async () => {
    try {
      await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/api/tracks",
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

  /**
   * Send the user's input to chatGPT and format the bot response.
   * @param userMessage The user's text input.
   * @param playlistName The chosen name of the playlist.
   * @param numberOfTracks The chosen number of tracks in the playlist.
   */
  submitBotRequest = async (
    userMessage: string,
    playlistName: string,
    numberOfTracks: number
  ) => {
    try {
      this.setPlaylistName(playlistName);
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/api/chatbot",
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
  };

  /**
   * Set the playlist name.
   * @param name The chosen playlist name.
   */
  setPlaylistName = (name: string) => {
    this.playlistName = name;
  };

  /**
   * Creates a playlist with the chosen tracks.
   */
  submitPlaylistRequest = async () => {
    try {
      this.playlist = await this.getTrackIDs(this.tracks);
      await this.createPlaylist(this.playlistName);
      this.addTracks();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  /**
   * When the user logs in, a verifier and a challenge are generated. With those, a URL to the Spotify authorization page is fetched.
   */
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

    /* async function generateCodeChallenge(codeVerifier: string) {
      console.log("Inside generate code challenge.");
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      console.log("Before done with code challenge");
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    } */

    async function generateCodeChallenge(codeVerifier: string) {
      
      // Convert the codeVerifier to bytes
      const codeVerifierBytes = forge.util.encodeUtf8(codeVerifier);
      
      // Use SHA-256 hash from forge
      const sha256 = forge.md.sha256.create();
      sha256.update(codeVerifierBytes);
      const digest = sha256.digest();
      
      // Convert the digest to base64URL format
      const base64URL = forge.util.encode64(digest.getBytes());
      
      return base64URL
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
  
  }

    try {
      const generated_verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(generated_verifier);

      localStorage.setItem("verifier", generated_verifier);
      const apiUrl = (process.env.REACT_APP_URL || "http://localhost:3001" ) + `/api/login?challenge=${encodeURIComponent(
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

  /**
   * If the user data is not set, it will be set. Also, the user will then be set to logged in.
   */
  getUserDetails = async () => {
    if (!Object.values(this.user).some((v) => v)) {
      this.getUserCode();
      if (this.user.code) {
        await this.getUserToken();
        await this.getUserProfile();
        await this.checkUserID();
        if (!!Object.values(this.user).some((v) => v)) {
          this.loggedIn = true;
        }
        this.notifyObservers();
      }
    }
  };

  /**
   * Get user code param.
   */
  getUserCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code_param = params.get("code");
    if (typeof code_param === "string") {
      this.user.code = code_param;
    }
  };

  /**
   * Get user token.
   */
  getUserToken = async () => {
    const verifier = localStorage.getItem("verifier");
    if (typeof this.user.code === "string" && typeof verifier === "string") {
      try {
        const data = await useFetch({
          url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + `/api/token`,
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

  /**
   * Get ID, email, and username of user.
   */
  getUserProfile = async () => {
    try {
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + `/api/profile?token=${encodeURIComponent(
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

  /**
   * Search for the given track on Spotify and return the URI of the first track in the search result.
   * @param track The title of the track.
   * @param artist The artist of the track.
   * @returns
   */
  getSearchResult = async (track: string, artist: string) => {
    try {
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) +`/api/search?token=${encodeURIComponent(
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

  /**
   * Logout from Spotify.
   */
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
  };

  /**
   * Set the current playlist.
   * @param playlistID The ID of the chosen playlist.
   */
  selectPlaylist = (playlistID: string) => {
    this.playlistID = playlistID;
  };
  
  /**
   * Check if the user is in the database. If not, add them to the database.
   */
  checkUserID = async () => {
    try {
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/db/checkuserid",
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userid: this.user.id,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  /**
   * Add a new playlist with the given name to the user's Spotify account.
   * @param playlistName The string name of the playlist.
   */
  createPlaylist = async (playlistName: string) => {
    try {
      const data = await useFetch({
        url:  (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/api/playlist",
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
      this.insertPlaylistInDB();
      this.notifyObservers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  insertPlaylistInDB = async () => {
    try{
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/db/insertplaylist",
        method: "POST" as Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          playlistid: this.playlistID,
          userid: this.user.id
        }
      });
      console.log("INSERT DATA" + data);
    } catch(error) {
      console.error("Error:", error);
    }
  }

  getPlaylistDB = async () => {
    try{
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + "/db/getplaylists",
        method: "POST" as Method,
        headers: {
            "Content-Type": "application/json",
        },
        body: {
          userid: this.user.id,
        },
      });
      console.log(data.queryRes);

      for(let i = 0; i < data.queryRes.length; i++){
        this.playlistDB.push(data.queryRes[i].PLAYLIST_ID);
      }
        
    }catch(error){
      console.log("Error:", error);
    }
  }

  /**
   * Get all playlists for the user.
   */
  getPlaylists = async () => {
    try {
      const data = await useFetch({
        url: (process.env.REACT_APP_URL || "http://localhost:3001" ) + `/api/getplaylists?token=${encodeURIComponent(
          this.user.token
        )}&userID=${encodeURIComponent(this.user.id)}`,
        method: "GET" as Method,
      });

      await this.getPlaylistDB();

      this.playlists = [];
      const items = data.playlists.items;


      for (let i = 0; i < items.length; i++) {
        if(this.playlistDB.includes(data.playlists.items[i].id)){
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
      }

      this.notifyObservers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

}

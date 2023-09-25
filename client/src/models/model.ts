interface Track {
  title: string;
  artist: string;
}

export default class HaipModel {
  botResponse: string;
  formattedResponse: Track[];
  urlResponse: string;
  userCode: string;
  userToken: string;
  userEmail: string;
  userName: string;
  userID: string;
  playlist: string[];
  playlistID: string;

  constructor() {
    this.botResponse = "";
    this.formattedResponse = [];
    this.urlResponse = "";
    this.userCode = "";
    this.userToken = "";
    this.userEmail = "";
    this.userName = "";
    this.userID = "";
    this.playlist = [];
    this.playlistID = "";
  }

  formatBotResponse(botMessage: string) {
    const tracks: Track[] = [];

    const arr = botMessage.split(",");

    for (let i = 0; i < arr.length; i++) {
      const trackInfo = arr[i].split("-");
      console.log(trackInfo);

      const track: Track = {
        title: trackInfo[0].trim(),
        artist: trackInfo[1].trim(),
      };

      tracks.push(track);
    }

    return tracks;
  }

  createPlaylist = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: this.userToken, userID: this.userID}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.playlistID = data.token.id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  addTracks = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistID: this.playlistID, uris: this.playlist, token: this.userToken}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async submitBotRequest(userMessage: string) {
    try {
      const response = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.botResponse = data.botResponse;

      this.formattedResponse = this.formatBotResponse(data.botResponse);

      const trackIDs = [];

      for (let i = 0; i < this.formattedResponse.length; i++) {
        const searchResult = await this.getSearchResult(
          this.formattedResponse[i].title,
          this.formattedResponse[i].artist
        );
        trackIDs.push(searchResult);
      }

      this.playlist = trackIDs;
      console.log("Final playlist: ", trackIDs);
      await this.createPlaylist();
      this.addTracks();
    } catch (error) {
      console.error("Error:", error);
      this.botResponse =
        "An error occurred while communicating with the chatbot.";
    }
    console.log("ChatBot: \n", this.botResponse);
  }

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
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.urlResponse = data.urlResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /* Get user code param */
  getUserCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code_param = params.get("code");
    if (typeof code_param === "string") {
      this.userCode = code_param;
    }
  };

  /* Get user token */
  getUserToken = async () => {
    const verifier = localStorage.getItem("verifier");
    if (typeof this.userCode === "string" && typeof verifier === "string") {
      try {
        const response = await fetch(`http://localhost:3001/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: this.userCode, verifier: verifier }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.userToken = data.token;
        // setToken(data.token);
        console.log("token: ", data.token);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  /* Get email and username of user */
  getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/profile?token=${encodeURIComponent(
          this.userToken
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.userEmail = data.profile.email;
      this.userName = data.profile.display_name;
      this.userID = data.profile.id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getSearchResult = async (artist: string, track: string) => {

    try {
      const response = await fetch(
        `http://localhost:3001/api/search?token=${encodeURIComponent(
          this.userToken
        )}&track=${encodeURIComponent(track)}&artist=${encodeURIComponent(
          artist
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.search.tracks.items[0].uri;
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

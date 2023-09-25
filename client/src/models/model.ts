interface userType {
  code: string,
  token: string,
  email: string,
  username: string,
}

export default class HaipModel {

  botResponse: string;
  urlResponse: string;
  loggedIn: boolean;
  user: userType;

  constructor() {
    this.botResponse = "";
    this.urlResponse = "";
    this.loggedIn = false;
    this.user = {
      code: "",
      token: "",
      email: "",
      username: ""
    };
  }

  /* Submit chatbot request and set the bot response */
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
    } catch (error) {
      console.error("Error:", error);
      this.botResponse = "An error occurred while communicating with the chatbot.";
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
  }

  getUserDetails = async () => {
    if (!Object.values(this.user).some(v => v)) {
      this.getUserCode() 
      await this.getUserToken();
      await this.getUserProfile();
      this.loggedIn = true;

      console.log("user: ", this.user);
    }
  }

  /* Get user code param */
  getUserCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code_param = params.get("code");
    if (typeof code_param === "string") {
      this.user.code = code_param;
    }
  }

  /* Get user token */
  getUserToken = async () => {
    const verifier = localStorage.getItem("verifier");
    if (typeof this.user.code === "string" && typeof verifier === "string") {
      try {
        const response = await fetch(`http://localhost:3001/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: this.user.code, verifier: verifier }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.user.token = data.token;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  
  /* Get email and username of user */
  getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/profile?token=${encodeURIComponent(this.user.token)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.user.email = data.profile.email;
      this.user.username = data.profile.display_name;
    } catch (error) {
      console.error("Error:", error);
    }
  }

};
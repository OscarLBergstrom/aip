import "../../assets/styles/create.scss";
import { useState } from "react";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  botResponse: string;
  setBotResponse: (response: string) => void;
  onSubmit: () => void;
}

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  botResponse,
  onSubmit,
}) => {
  const [userName, setUserName] = useState<string>("placeholder");
  const [token, setToken] = useState<string>("placeholder");
  const [profileInfo, setProfileInfo] = useState<string>("placeholder");

  const handleSubmitAPI = async () => {
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
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      localStorage.setItem("verifier", verifier);
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
      document.location = data.urlResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getToken = async () => {
    const verifier = localStorage.getItem("verifier");
    if (typeof code === "string" && typeof verifier === "string") {
      try {
        const response = await fetch(`http://localhost:3001/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code, verifier: verifier }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getProfile = async () => {
    try {

      const response = await fetch(
        `http://localhost:3001/api/profile?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProfileInfo(data.profile.email);
      setUserName(data.profile.display_name);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="create">
      <div className="card">
        <div className="title">Hello {userName}!</div>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            What kind of playlist do you want to create?
            <input
              type="text"
              name="query"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <p>Chatbot: {botResponse}</p>
          <p>Code:</p>
          <p>{code}</p>
          <p>Token:</p>
          <p>{token}</p>
          <p>Profile information: </p>
          <p>{profileInfo}</p>
        </div>
        <button onClick={handleSubmitAPI}>Test API</button>
        <button onClick={getToken}>Get token</button>
        <button onClick={getProfile}>Get profile information</button>
      </div>
    </div>
  );
};

export default CreateView;

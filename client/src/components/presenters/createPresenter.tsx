import CreateView from "../views/createView";
import { useState } from "react";

const CreatePresenter = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");

  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("placeholder");
  const [email, setEmail] = useState<string>("placeholder");

  const getCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code_param = params.get("code");
    if (typeof code_param === "string") setCode(code_param);
  };

  const handleSubmit = async () => {
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
      setBotResponse(data.botResponse);
    } catch (error) {
      console.error("Error:", error);
      setBotResponse("An error occurred while communicating with the chatbot.");
    }
  };

  const handleLogin = async () => {
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
        console.log("token: ", data.token);
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
      setEmail(data.profile.email);
      setUserName(data.profile.display_name);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CreateView
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      botResponse={botResponse}
      onSubmit={handleSubmit}
      code={code}
      token={token}
      email={email}
      userName={userName}
      onLoad={getCode}
      onLogin={handleLogin}
      onToken={getToken}
      onProfile={getProfile}
    />
  );
};

export default CreatePresenter;

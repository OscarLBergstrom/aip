import HomeView from "../views/homeView";

const HomePresenter = () => {
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

  return <HomeView onLogin={handleLogin} />;
};

export default HomePresenter;

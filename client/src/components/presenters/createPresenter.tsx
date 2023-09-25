import CreateView from "../views/createView";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";

interface CreatePresenterProps {
  model: HaipModel;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({ model }) => {
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
    await model.submitBotRequest(userMessage);
    setBotResponse(model.botResponse);
    redirect("/preview");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
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
      onToken={getToken}
      onProfile={getProfile}
    />
  );
};

export default CreatePresenter;

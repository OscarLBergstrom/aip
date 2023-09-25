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
    model.getUserCode();
    setCode(model.userCode);
  };

  const handleSubmit = async () => {
    await model.submitBotRequest(userMessage);
    setBotResponse(model.botResponse);
    console.log(model.botResponse);
    getSearchResult();
    redirect("/preview");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  };

  const getSearchResult = async () => {
    const artist = "Abba";
    const track = "Dancing queen";

    try {
      const response = await fetch(
        `http://localhost:3001/api/search?token=${encodeURIComponent(
          token
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
      console.log("Final search data: ", data.search.tracks.items[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getToken = async () => {
    await model.getUserToken();
    setToken(model.userToken);
  };

  const getProfile = async () => {
    await model.getUserProfile();
    setEmail(model.userEmail);
    setUserName(model.userName);
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

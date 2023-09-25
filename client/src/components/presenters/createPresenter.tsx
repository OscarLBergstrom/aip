import CreateView from "../views/createView";
import { useState, useEffect } from "react";
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
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect( () => {
    const getUser = async () => {
      await model.getUserDetails();
      setCode(model.user.code);
      setToken(model.user.token);
      setUserName(model.user.username);
      setEmail(model.user.email);
    }

    getUser();
  }, [])

  const handleSubmit = async () => {
    await model.submitBotRequest(userMessage);
    setBotResponse(model.botResponse);
    redirect("/preview");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
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
    />
  );
};

export default CreatePresenter;

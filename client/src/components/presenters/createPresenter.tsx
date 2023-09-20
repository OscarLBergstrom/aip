import CreateView from "../views/createView";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import HaipModel from "../../models/model";

interface CreatePresenterProps {
  model: HaipModel;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({
  model
}) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");

  const handleSubmit = async () => {
    await model.submitBotRequest(userMessage);
    setBotResponse(model.botResponse);
    redirect("/preview");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  }

  return (
    <CreateView
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      botResponse={botResponse}
      setBotResponse={setBotResponse}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePresenter;

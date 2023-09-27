import CreateView from "../views/createView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";

interface CreatePresenterProps {
  model: HaipModel;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({ model }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
  const [numberOfTracks, setNumberOfTracks] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");

  useEffect( () => {
    const getUser = async () => {
      await model.getUserDetails();
      setUserName(model.user.username);
    }

    getUser();
  }, [])

  const handleSubmit = async () => {
    await model.submitBotRequest(userMessage, playlistName, numberOfTracks);
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
      playlistName={playlistName}
      setPlaylistName={setPlaylistName}
      setNumberOfTracks={setNumberOfTracks}
      onSubmit={handleSubmit}
      userName={userName}
    />
  );
};

export default CreatePresenter;

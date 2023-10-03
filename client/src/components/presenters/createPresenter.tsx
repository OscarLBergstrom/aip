import CreateView from "../views/createView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";

interface CreatePresenterProps {
  model: HaipModel;
}

interface User {
  code: string;
  token: string;
  email: string;
  username: string;
  id: string;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({ model }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
  const [numberOfTracks, setNumberOfTracks] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [botResponse, setBotResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      await model.getUserDetails();
      setUserName(model.user.username);
    };

    const userObserver = () => {
      setUser(model.user);
      console.log("presenter", model.user);
    }

    const botResponseObserver = () => {
      setBotResponse(model.botResponse);
    };

    getUser();
    model.addObserver(userObserver);
    model.addObserver(botResponseObserver);
  }, [model]);

  const handleSubmit = async () => {
    setLoading(true);
    await model.submitBotRequest(userMessage, playlistName, numberOfTracks);
    setLoading(false);
  };

  const createPlaylist = async () => {
    redirect("/preview");
  };

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  };

  return loading ? (
    <div>Loading</div>
  ) : (
    <CreateView
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      playlistName={playlistName}
      setPlaylistName={setPlaylistName}
      numberOfTracks={numberOfTracks}
      setNumberOfTracks={setNumberOfTracks}
      onSubmit={handleSubmit}
      userName={userName}
      botResponse={botResponse}
      createPlaylist={createPlaylist}
    />
  );
};

export default CreatePresenter;

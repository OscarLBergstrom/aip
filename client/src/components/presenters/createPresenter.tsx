import CreateView from "../views/createView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";
import LoadingView from "../views/loadingView";
import { Track } from "../../assets/utils/types";

interface CreatePresenterProps {
  model: HaipModel;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({ model }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
  const [numberOfTracks, setNumberOfTracks] = useState<number>(1);
  const [botResponse, setBotResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      await model.getUserDetails();
    };

    getUser();
  }, []);

  const botResponseObserver = () => {
    setBotResponse(model.botResponse);
  };

  const tracksObserver = () => {
    setTracks(model.tracks);
  }

  model.addObserver(botResponseObserver);
  model.addObserver(tracksObserver);

  const handleSubmit = async () => {
    setLoading(true);
    await model.submitBotRequest(userMessage, playlistName, numberOfTracks);
    setSubmitted(true);
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
    <LoadingView/>
  ) : (
    <CreateView
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      playlistName={playlistName}
      setPlaylistName={setPlaylistName}
      numberOfTracks={numberOfTracks}
      setNumberOfTracks={setNumberOfTracks}
      onSubmit={handleSubmit}
      botResponse={botResponse}
      createPlaylist={createPlaylist}
      tracks={tracks}
      submitted={submitted}
    />
  );
};

export default CreatePresenter;

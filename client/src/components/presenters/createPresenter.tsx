import CreateView from "../views/createView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HaipModel from "../../models/model";
import LoadingView from "../views/loadingView";
import { Track } from "../../utils/types";

interface CreatePresenterProps {
  model: HaipModel;
}

const CreatePresenter: React.FC<CreatePresenterProps> = ({ model }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
  const [numberOfTracks, setNumberOfTracks] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(true);

  const tracksObserver = () => {
    setTracks(model.tracks);
  }

  model.addObserver(tracksObserver);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    await model.submitBotRequest(userMessage, playlistName, numberOfTracks);
    setSubmitted(true);
    if(model.tracks.length) {
      setSuccess(true);
      setShowCreate(false);
    }
    setLoading(false);
  };

  const createPlaylist = async () => {
    setLoading(true);
    await model.submitPlaylistRequest();
    setLoading(false);
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
      createPlaylist={createPlaylist}
      tracks={tracks}
      submitted={submitted}
      success={success}
      showCreate={showCreate}
      setShowCreate={setShowCreate}
    />
  );
};

export default CreatePresenter;

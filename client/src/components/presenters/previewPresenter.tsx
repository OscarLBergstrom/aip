import PreviewView from "../views/previewView";
import HaipModel from "../../models/model";
import { useState } from "react";

interface PreviewPresenterProps {
  model: HaipModel;
}

const PreviewPresenter: React.FC<PreviewPresenterProps> = ({ model }) => {
  const [playlistID, setPlaylistID] = useState<string>(model.playlistID);

  const playlistObserver = () => {
    setPlaylistID(model.playlistID);
  };

  model.addObserver(playlistObserver);

  return (
    <PreviewView playlistID={playlistID} />
  );
};

export default PreviewPresenter;

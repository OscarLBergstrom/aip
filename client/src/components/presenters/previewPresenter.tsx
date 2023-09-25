import PreviewView from "../views/previewView";
import HaipModel from "../../models/model";
import { useState } from "react";

interface PreviewPresenterProps {
  model: HaipModel;
}

const PreviewPresenter: React.FC<PreviewPresenterProps> = ({ model }) => {
  const [playlistID, setPlaylistID] = useState<string>("");

  const getPlaylistID = async () => {
    setPlaylistID(model.playlistID);
  };

  return <PreviewView playlistID={playlistID} getPlaylistID={getPlaylistID} />;
};

export default PreviewPresenter;

import PreviewView from "../views/previewView";
import HaipModel from "../../models/model";
import { useEffect, useState } from "react";

interface PreviewPresenterProps {
  model: HaipModel;
}

const PreviewPresenter: React.FC<PreviewPresenterProps> = ({ model }) => {
  const [playlistID, setPlaylistID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPlaylist = async () => {
      setLoading(true);
      await model.submitPlaylistRequest();
      setLoading(false);
    };

    getPlaylist();
  }, []);

  const playlistObserver = () => {
    setPlaylistID(model.playlistID);
  };

  model.addObserver(playlistObserver);

  return loading ? <div>Loading</div> : <PreviewView playlistID={playlistID} />;
};

export default PreviewPresenter;

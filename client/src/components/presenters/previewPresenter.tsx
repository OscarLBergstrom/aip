import PreviewView from "../views/previewView";
import HaipModel from "../../models/model";
import { useEffect, useState } from "react";

interface PreviewPresenterProps {
  model: HaipModel;
}

const PreviewPresenter: React.FC<PreviewPresenterProps> = ({ model }) => {
  const [playlistID, setPlaylistID] = useState<string>("");

  useEffect(() => {
    const playlistObserver = async () => {
      console.log("inside observer");
      setPlaylistID(model.playlistID);
    };
    
    setPlaylistID(model.playlistID); // Den här behövs för när vi kommer hit, har model.playlistID redan satts. 
    model.addObserver(playlistObserver);
  }, []);

  return <PreviewView playlistID={playlistID} />;
};

export default PreviewPresenter;

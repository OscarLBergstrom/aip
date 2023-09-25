import "../../assets/styles/preview.scss";
import "../../assets/styles/common.scss";

interface PreviewViewProps {
  playlistID: string;
  getPlaylistID: () => void;
}

const PreviewView: React.FC<PreviewViewProps> = ({
  getPlaylistID,
  playlistID,
}) => {
  getPlaylistID();

  return (
    <div className="preview">
      <div className="title">Your AI generated playlist!</div>
      <iframe
        id="player"
        className="player"
        src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <button className="button red">Delete playlist</button>
    </div>
  );
};

export default PreviewView;

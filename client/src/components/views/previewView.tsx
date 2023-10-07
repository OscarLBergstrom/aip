import "../../assets/styles/preview.scss";
import "../../assets/styles/common.scss";

interface PreviewViewProps {
  playlistID: string;
}

const PreviewView: React.FC<PreviewViewProps> = ({ playlistID }) => {
  return (
    <div className="page">
      <div className="card">
        <div className="subtitle">Your HAIP Playlist</div>
        <iframe
          id="player"
          title="preview playlist player"
          className="player"
          src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        {/* <button className="button red">Delete playlist</button> */}
      </div>
    </div>
  );
};

export default PreviewView;

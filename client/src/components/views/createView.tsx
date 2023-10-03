import "../../assets/styles/create.scss";
import "../../assets/styles/common.scss";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  playlistName: string;
  setPlaylistName: (name: string) => void;
  numberOfTracks: number;
  setNumberOfTracks: (numberOfTracks: number) => void;
  onSubmit: () => void;
  userName: string;
  botResponse: string;
  createPlaylist: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  playlistName,
  setPlaylistName,
  numberOfTracks,
  setNumberOfTracks,
  onSubmit,
  userName,
  botResponse,
  createPlaylist,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    createPlaylist();
  };

  return (
    <div className="page">
      <div className="card">
        <div className="title">Hello {userName}!</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="option">
            <div className="optionText"> What kind of playlist do you want to create?</div>
            <input
              type="text"
              name="query"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </div>
          <div className="subtitle">Additional data</div>
          <div className="option">
            <div className="optionText">Name of playlist</div>
            <input
              type="text"
              name="name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </div>
          <div className="option">
            <div className="optionText">Number of tracks: {numberOfTracks}</div>
            <input
              type="range"
              name="numberOfTracks"
              min="1"
              max="10"
              defaultValue="1"
              onChange={(e) => setNumberOfTracks(parseInt(e.target.value))}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <div>Output: {botResponse}</div>
        <button onClick={handleClick}>Create playlist</button>
      </div>
    </div>
  );
};

export default CreateView;

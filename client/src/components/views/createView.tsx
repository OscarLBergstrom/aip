import "../../assets/styles/create.scss";
import "../../assets/styles/common.scss";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  playlistName: string;
  setPlaylistName: (name: string) => void;
  setNumberOfTracks: (numberOfTracks: number) => void;
  onSubmit: () => void;
  userName: string;
}

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  playlistName,
  setPlaylistName,
  setNumberOfTracks,
  onSubmit,
  userName,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="page">
      <div className="card">
        <div className="title">Hello {userName}!</div>
        <form className="form" onSubmit={handleSubmit}>
          <div> What kind of playlist do you want to create?</div>
          <input
            type="text"
            name="query"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <div className="subtitle">Additional data:</div>
          <div>Name of playlist:</div>
          <input
            type="text"
            name="name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <div>Number of songs:</div>
          <input
            type="number"
            name="numberOfTracks"
            min="1"
            max="10"
            defaultValue="1"
            onChange={(e) => setNumberOfTracks(parseInt(e.target.value))}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateView;

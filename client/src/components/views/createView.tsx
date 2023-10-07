import "../../assets/styles/create.scss";
import "../../assets/styles/common.scss";
import { Track } from "../../assets/utils/types";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  playlistName: string;
  setPlaylistName: (name: string) => void;
  numberOfTracks: number;
  setNumberOfTracks: (numberOfTracks: number) => void;
  onSubmit: () => void;
  createPlaylist: () => void;
  tracks: Track[];
  submitted: boolean;
  success: boolean;
  showCreate: boolean;
  setShowCreate: (showCreate: boolean) => void;
}

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  playlistName,
  setPlaylistName,
  numberOfTracks,
  setNumberOfTracks,
  onSubmit,
  createPlaylist,
  tracks,
  submitted,
  success,
  showCreate,
  setShowCreate,
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
        { success 
          ? <div>
              { showCreate
                ? <div className="toggler">
                    <AiOutlineUp className="icon arrow" size="24px" onClick={() => setShowCreate(false)}/>
                    <div className="toggler-text-open">Edit Playlist</div>
                  </div>
                : <div className="toggler">
                    <AiOutlineDown className="icon arrow" size="24px" onClick={() => setShowCreate(true)}/>
                    <div className="toggler-text-closed">Edit Playlist</div>
                  </div>
              }
            </div>
          : <div/>
        }
        { showCreate 
          ? (
            <div className="create">
              {success ? <div/> : <div className="subtitle">Create Playlist</div>}
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
                    defaultValue={numberOfTracks}
                    onChange={(e) => setNumberOfTracks(parseInt(e.target.value))}
                  />
                </div>
                <input type="submit" value={"Submit"} />
              </form>
            </div>
          ) : <div/>
        }
        {submitted 
        ? ( 
          success
          ? (
            <div>
              <div className="subtitle">Your HAIP Playlist</div>
              <div className="botlist">
                {tracks.map((track, index) => (
                  <div className="botlist-item" key={index}>
                    <div className="botlist-item-title">{track.title}</div>
                    <div className="botlist-item-artist">{track.artist}</div>
                  </div>
                ))}
              </div>
              <button className="button" onClick={handleClick}>Save to Spotify</button>
            </div>
          ) : <div className="error">
                <BiErrorCircle size="20px"/>
                <div className="error-message">Could not generate playlist, please provide a better description.</div>
              </div> 
        )
        : <div/> }
      </div>
    </div>
  );
};

export default CreateView;

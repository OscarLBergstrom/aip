import "../../assets/styles/home.scss";
import "../../assets/styles/common.scss";

interface HomeViewProps {
  onLogin: () => void;
  loggedIn: boolean;
  haipWord: string;
  goToCreate: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  onLogin,
  loggedIn,
  haipWord, 
  goToCreate,
}) => {


  return (
    <div className="page">
      <div className="card">
        <div className="haip-text" id="haip-text">
          <div className="fade">{haipWord}</div>
          <div className="subtext">AI PLAYLIST</div>
        </div>
        <div className="haip-info">
          <div className="info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        {!(loggedIn)
          ? <button className="button" onClick={onLogin}>
              Login
            </button>
          : <button className="button" onClick={() => goToCreate()}>
              Create New Playlist
            </button>
        }
      </div>
    </div>
  );
};

export default HomeView;

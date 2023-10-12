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
          Welcome to HAIP: Your AI Playlist Generator!
          HAIP is your ultimate music companion. Using the synergy of OpenAI and Spotify's APIs, HAIP simplifies playlist creation. 
          Describe your desired mood, set the playlist's name and track count, and our AI will craft a personalized playlist for you. 
          If you love a playlist, save it to Spotify with a single click.
          What's more, you can listen to your playlists directly on the website, enhancing your music experience. And with HAIP, all your created playlists are conveniently stored in one place for easy access. 
          Whether it's a 'Hypnotic Chillout Vibes' playlist or 'High-Energy Workout' mix, HAIP has your music needs covered. 
          Elevate your music enjoyment with HAIP today, where AI meets your unique taste!
          </div>
        </div>
        {!(loggedIn)
          ? <button id="login-button" className="button" onClick={onLogin}>
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

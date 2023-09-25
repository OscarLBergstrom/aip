import "../../assets/styles/home.scss";

interface HomeViewProps {
  onLogin: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onLogin }) => {
  return (
    <div className="home">
      <div className="card">
        <div className="title">Welcome to HAIP!</div>
        <div className="info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <button className="login" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HomeView;

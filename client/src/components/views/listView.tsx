import "../../assets/styles/common.scss";
import "../../assets/styles/list.scss";
import temp_logo from "../../assets/images/temp_logo.png";

interface ListViewProps {
    onSelect: () => void;
}

const ListView: React.FC<ListViewProps> = ({ onSelect }) => {

    const playlists = ["Playlist 1", "Playlist 2", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3", "Playlist 3"];

    return (
        <div className="page">
            <div className="card">
                <div className="subtitle">My Playlists</div>
                <div className="list">
                    {playlists.map((playlist, index) => (
                        <div key={index} className="list-item" onClick={onSelect}>
                            <img className="list-item-image" src={temp_logo} alt="temp logo"/>
                            <div className="list-item-name">{playlist}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListView;
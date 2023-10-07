import "../../assets/styles/common.scss";
import "../../assets/styles/list.scss";
import { Playlist} from "../../assets/utils/types";

interface ListViewProps {
    onSelect: (playlist: string) => void;
    myPlaylists: Playlist[];
}

const ListView: React.FC<ListViewProps> = ({ 
    onSelect,
    myPlaylists,
 }) => {

    return (
        <div className="page">
            <div className="card">
                <div className="subtitle">My Playlists</div>
                <div className="list">
                    {myPlaylists.map((playlist, index) => (
                        <div key={index} className="list-item" onClick={() => onSelect(playlist.id)}>
                            <img className="list-item-image" src={playlist.image_url} alt="playlist image"/>
                            <div className="list-item-name">{playlist.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListView;
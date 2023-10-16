import "../../assets/styles/common.scss";
import "../../assets/styles/list.scss";
import { Playlist} from "../../utils/types";

interface ListViewProps {
    onSelect: (playlist: string) => void;
    playlists: Playlist[];
}

const ListView: React.FC<ListViewProps> = ({ 
    onSelect,
    playlists,
 }) => {

    return (
        <div className="page">
            <div className="card">
                <div className="subtitle" id="list-title">Your Playlists</div>
                <div className="list" id="list">
                    {playlists.map((playlist, index) => (
                        <div id="list-item" key={index} className="list-item" onClick={() => onSelect(playlist.id)}>
                            <img className="list-item-image" src={playlist.image_url} alt="playlist"/>
                            <div className="list-item-name">{playlist.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListView;
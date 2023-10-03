import "../../assets/styles/sidebar.scss";
import "../../assets/styles/common.scss";
import { HiMenu } from "react-icons/hi";
import { User } from "../../assets/utils/types";

interface SidebarViewProps {
    showSidebar: boolean;
    toggleShowSidebar: () => void;
    user: User;
}

const SidebarView: React.FC<SidebarViewProps> = ({
    showSidebar,
    toggleShowSidebar,
    user
}) => {

    return (
        <div>
            <div className="menu-toggler" onClick={toggleShowSidebar}>
                <HiMenu className="icon" size="32px"/>
            </div>
            
            <div className={
                showSidebar
                ? "sidebar open"
                : "sidebar"
            }>
                <div className="menu-item">
                    <a className="menu-link" href="/">Home</a>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href={`/create?code=${user.code}`}>Create Playlist</a>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="/list">My Playlists</a>
                </div>
            </div>
        </div>
    );
}

export default SidebarView;
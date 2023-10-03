import "../../assets/styles/sidebar.scss";
import "../../assets/styles/common.scss";
import { HiMenu } from "react-icons/hi";

interface SidebarViewProps {
    showSidebar: boolean;
    toggleShowSidebar: () => void;
}

const SidebarView: React.FC<SidebarViewProps> = ({
    showSidebar,
    toggleShowSidebar,
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
                    <a className="menu-link" href="/create">Create Playlist</a>
                </div>
            </div>
        </div>
    );
}

export default SidebarView;
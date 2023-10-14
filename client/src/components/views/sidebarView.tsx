import "../../assets/styles/sidebar.scss";
import "../../assets/styles/common.scss";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

interface SidebarViewProps {
    showSidebar: boolean;
    toggleShowSidebar: () => void;
    redirect: (page: string) => void;
}

const SidebarView: React.FC<SidebarViewProps> = ({
    showSidebar,
    toggleShowSidebar,
    redirect,
}) => {

    return (
        <div>
            <div id="menu-toggler" className="menu-toggler" onClick={toggleShowSidebar}>
                {showSidebar
                    ? <AiOutlineClose className="icon" size="32px"/>
                    : <HiMenu className="icon" size="32px"/>}
            </div>
            <div className={
                showSidebar
                ? "sidebar open"
                : "sidebar"
            } id="menu">
                <div id="menu-item-home" className="menu-item">
                    <div className="menu-link" onClick={() => redirect("/")}>Home</div>
                </div>
                <div id="menu-item-create" className="menu-item">
                    <div className="menu-link" onClick={() => redirect(`/create`)}>Create Playlist</div>
                </div>
                <div id="menu-item-list" className="menu-item">
                    <div className="menu-link" onClick={() => redirect("/list")}>Your Playlists</div>
                </div>
            </div>
        </div>
    );
}

export default SidebarView;
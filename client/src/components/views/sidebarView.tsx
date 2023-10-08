import "../../assets/styles/sidebar.scss";
import "../../assets/styles/common.scss";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { User } from "../../utils/types";

interface SidebarViewProps {
    showSidebar: boolean;
    toggleShowSidebar: () => void;
    redirect: (page: string) => void;
    user: User;
}

const SidebarView: React.FC<SidebarViewProps> = ({
    showSidebar,
    toggleShowSidebar,
    redirect,
    user,
}) => {

    return (
        <div>
            <div className="menu-toggler" onClick={toggleShowSidebar}>
                {showSidebar
                    ? <AiOutlineClose className="icon" size="32px"/>
                    : <HiMenu className="icon" size="32px"/>}
            </div>
            
            <div className={
                showSidebar
                ? "sidebar open"
                : "sidebar"
            }>
                <div className="menu-item">
                    <div className="menu-link" onClick={() => redirect("/")}>Home</div>
                </div>
                <div className="menu-item">
                    <div className="menu-link" onClick={() => redirect(`/create?code=${user.code}`)}>Create Playlist</div>
                </div>
                <div className="menu-item">
                    <div className="menu-link" onClick={() => redirect("/list")}>Your Playlists</div>
                </div>
            </div>
        </div>
    );
}

export default SidebarView;
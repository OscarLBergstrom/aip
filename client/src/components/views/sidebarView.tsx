import "../../assets/styles/sidebar.scss";
import "../../assets/styles/common.scss";
import { HiMenu } from "react-icons/hi";
import { User } from "../../assets/utils/types";

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
                <HiMenu className="icon" size="32px"/>
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
                    <div className="menu-link" onClick={() => redirect(`/create?code=${user.code}`)}>Create playlist</div>
                </div>
                <div className="menu-item">
                    <div className="menu-link" onClick={() => redirect("/list")}>My playlists</div>
                </div>
            </div>
        </div>
    );
}

export default SidebarView;
import "../../assets/styles/header.scss";
import "../../assets/styles/common.scss"
import { HiOutlineLogout } from "react-icons/hi";

interface HeaderViewProps {
    loggedIn: boolean;
    onLogout: () => void;
    goToHome: () => void;
}

const HeaderView: React.FC<HeaderViewProps> = ({
    loggedIn,
    onLogout,
    goToHome
}) => {
    return (
        <div className="header">
            <div className="header-text" onClick={() => goToHome()}>HAIP</div>
            {loggedIn
            ?
                <div className="logout" 
                    onClick={() => onLogout()}
                    >
                    <HiOutlineLogout className="icon" size="32px"/>
                </div>
            :   <div></div>
            }
        </div>
    );
}

export default HeaderView;
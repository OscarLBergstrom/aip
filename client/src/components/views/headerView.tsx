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
        loggedIn
        ? (
            <div className="header">
                <div className="header-text loggedIn" onClick={() => goToHome()}>HAIP</div>
                <div className="logout" 
                    onClick={() => onLogout()}
                    >
                    <HiOutlineLogout className="icon" size="32px"/>
                </div>
            </div>
        ) : (
            <div className="header">
                <div className="header-text">HAIP</div>
            </div>
        )
    );
}

export default HeaderView;
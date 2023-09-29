import "../../assets/styles/header.scss";
import "../../assets/styles/common.scss"
import temp_logo from "../../assets/images/temp_logo.png";
import { HiOutlineLogout } from "react-icons/hi";

interface HeaderViewProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const HeaderView: React.FC<HeaderViewProps> = ({
    setLoggedIn
}) => {
    return (
        <div className="header">
            <img className="logo" src={temp_logo} alt="temp logo"/>
            <div>HAIP</div>
            <div className="logout" onClick={() => setLoggedIn(false)}>
                <HiOutlineLogout className="icon" size="32px"/>
            </div>
        </div>
    );
}

export default HeaderView;
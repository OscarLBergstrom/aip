import "../../assets/styles/header.scss";
import "../../assets/styles/common.scss"
import temp_logo from "../../assets/images/temp_logo.png";
import { HiOutlineLogout } from "react-icons/hi";

interface HeaderViewProps {
    loggedIn: boolean;
    // setLoggedIn: (loggedIn: boolean) => void;
}

const HeaderView: React.FC<HeaderViewProps> = ({
    loggedIn,
    // setLoggedIn
}) => {
    return (
        <div className="header">
            <img className="logo" src={temp_logo} alt="temp logo"/>
            <div>HAIP</div>
            {loggedIn
            ?
                <div className="logout" 
                    // onClick={() => setLoggedIn(false)}
                    >
                    <HiOutlineLogout className="icon" size="32px"/>
                </div>
            :   <div>Not logged in</div>
            }
        </div>
    );
}

export default HeaderView;
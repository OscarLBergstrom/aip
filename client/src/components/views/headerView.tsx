import "../../assets/styles/header.scss";
import "../../assets/styles/common.scss"
import temp_logo from "../../assets/images/temp_logo.png";

const HeaderView = () => {
    return (
        <div className="header">
            <img className="logo" src={temp_logo} alt="temp logo"/>
            <div>HAIP</div>
        </div>
    );
}

export default HeaderView;
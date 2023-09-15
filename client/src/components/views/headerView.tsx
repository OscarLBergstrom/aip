import "../../assets/styles/header.scss";
import "../../assets/styles/common.scss"
import templogo from "../../assets/images/templogo.png";

const HeaderView = () => {
    return (
        <div className="header">
            <img className="logo" src={templogo} alt="templogo"/>
            <div>HAIP</div>
        </div>
    );
}

export default HeaderView;
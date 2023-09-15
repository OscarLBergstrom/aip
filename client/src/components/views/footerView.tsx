import "../../assets/styles/footer.scss";
import "../../assets/styles/common.scss"
import spotify_logo from "../../assets/images/spotify_logo.png";
import chatgpt_logo from "../../assets/images/chatGPT_logo.webp";

const HeaderView = () => {
    return (
        <div className="footer">
            <img className="logo" src={spotify_logo} alt="spotify logo"/>
            <img className="logo" src={chatgpt_logo} alt="chatGPT logo"/>
        </div>
    );
}

export default HeaderView;
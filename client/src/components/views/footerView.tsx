import "../../assets/styles/footer.scss";
import spotify_logo from "../../assets/images/spotify_logo.png";
import chatgpt_logo from "../../assets/images/chatGPT_logo.webp";

interface FooterViewProps {
    goToUrl: (url: string) => void;
}

const HeaderView:React.FC<FooterViewProps> = ({ goToUrl }) => {
    return (
        <div className="footer">
            <div className="footer-text">
                Powered by the APIs of OpenAI and Spotify
            </div>
            <img className="logo" src={spotify_logo} alt="spotify logo" onClick={() => {goToUrl('https://developer.spotify.com/documentation/web-api')}}/>
            <img className="logo" src={chatgpt_logo} alt="chatGPT logo" onClick={() => {goToUrl('https://openai.com/blog/openai-api')}}/>
        </div>
    );
}

export default HeaderView;
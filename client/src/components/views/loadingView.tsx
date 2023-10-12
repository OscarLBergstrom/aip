import "../../assets/styles/common.scss";
import "../../assets/styles/loading.scss";

const LoadingView = () => {
    return (
        <div className="page">
            <div className="loader" id="loader">
                <span className="stroke"/>
                <span className="stroke"/>
                <span className="stroke"/>
                <span className="stroke"/>
                <span className="stroke"/>
                <span className="stroke"/>
                <span className="stroke"/>
            </div>
        </div>
    );
}

export default LoadingView;
import LoadingView from "../views/loadingView";
import HaipModel from "../../models/model";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoadingPresenterProps {
    model: HaipModel;
}

const LoadingPresenter: React.FC<LoadingPresenterProps> = ({ model }) => {

    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    useEffect(() => {
        const getUser = async () => {
            await model.getUserDetails();
            await model.getPlaylists();
            setTimeout(() => {
                if (!!Object.values(model.user).some((v) => v)) {
                    redirect("/home");
                }
            }, 1000);
        };
    
        getUser();
    }, []);

    return <LoadingView/>;

};

export default LoadingPresenter;
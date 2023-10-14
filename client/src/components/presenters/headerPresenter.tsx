import HeaderView from "../views/headerView";
import HaipModel from "../../models/model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderPresenterProps {
    model: HaipModel;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({ model }) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);

    const loggedInObserver = () => {
        setLoggedIn(model.loggedIn);
    };

    model.addObserver(loggedInObserver);

    const handleLogout = () => {
        model.logout();
        setLoggedIn(false);
        redirect("/home");
    }

    const goToHome = () => {
        redirect("/home");
    }

    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    return (
        <HeaderView 
            loggedIn={loggedIn}
            onLogout={handleLogout}
            goToHome={goToHome}
        />
    );
}

export default HeaderPresenter;
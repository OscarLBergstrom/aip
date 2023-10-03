import HeaderView from "../views/headerView";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderPresenterProps {
    model: HaipModel;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({ model }) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);

    useEffect(() => {
        const loggedInObserver = () => {
            setLoggedIn(model.loggedIn);
        };

        model.addObserver(loggedInObserver);
    }, [model]);

    const handleLogout = () => {
        model.logout();
        setLoggedIn(false);
        redirect("/");
    }

    let navigate = useNavigate();
    const redirect = (page: string) => {
        navigate(page);
    };

    return (
        <HeaderView 
            loggedIn={loggedIn}
            onLogout={handleLogout}
        />
    );
}

export default HeaderPresenter;
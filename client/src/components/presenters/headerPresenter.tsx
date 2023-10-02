import HeaderView from "../views/headerView";
import HaipModel from "../../models/model";
import { useState, useEffect } from "react";

interface HeaderPresenterProps {
    model: HaipModel;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({ model }) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);

    return (
        <HeaderView 
        loggedIn={loggedIn}
        // setLoggedIn={setLoggedIn}
        />
    );
}

export default HeaderPresenter;
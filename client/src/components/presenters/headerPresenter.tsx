import HeaderView from "../views/headerView";
import { useState } from "react";

const HeaderPresenter = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <HeaderView setLoggedIn={setLoggedIn}/>
    );
}

export default HeaderPresenter;
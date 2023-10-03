import SidebarView from "../views/sidebarView";
import { useState, useEffect } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import HaipModel from "../../models/model";
import { User } from "../../assets/utils/types";

interface SidebarPresenterProps {
  model: HaipModel;
}

const SidebarPresenter: React.FC<SidebarPresenterProps> = ({ model }) => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);
    const [user, setUser] = useState<User>(model.user);
    const loggedInObserver = () => {
        setLoggedIn(model.loggedIn);
    };

    const userObserver = () => {
        setUser(model.user);
    }

    model.addObserver(userObserver);
    model.addObserver(loggedInObserver);

    const ref = useOutsideClick(() => {
        if (showSidebar) {
            setShowSidebar(false);
        }
      });

    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (loggedIn
        ?   <div ref={ref}>
                <SidebarView 
                    showSidebar={showSidebar}
                    toggleShowSidebar={toggleShowSidebar}
                    user={user}
                />
            </div>
        : <div/>);
}

export default SidebarPresenter;
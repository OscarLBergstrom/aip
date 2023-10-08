import SidebarView from "../views/sidebarView";
import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import HaipModel from "../../models/model";
import { User } from "../../utils/types";
import { useNavigate } from "react-router-dom";

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

    let navigate = useNavigate();
    const redirect = (page: string) => {
        if (showSidebar) {
            setShowSidebar(false);
        }
        navigate(page);
    };

    return (loggedIn
        ?   <div ref={ref}>
                <SidebarView 
                    showSidebar={showSidebar}
                    toggleShowSidebar={toggleShowSidebar}
                    redirect={redirect}
                    user={user}
                />
            </div>
        : <div/>);
}

export default SidebarPresenter;
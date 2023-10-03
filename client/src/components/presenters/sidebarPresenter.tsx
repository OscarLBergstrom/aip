import SidebarView from "../views/sidebarView";
import { useState, useEffect } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import HaipModel from "../../models/model";

interface SidebarPresenterProps {
  model: HaipModel;
}

const SidebarPresenter: React.FC<SidebarPresenterProps> = ({ model }) => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loggedInObserver = () => {
            setLoggedIn(model.loggedIn);
        };

        model.addObserver(loggedInObserver);
    }, [model]);

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
                />
            </div>
        : <div/>);
}

export default SidebarPresenter;
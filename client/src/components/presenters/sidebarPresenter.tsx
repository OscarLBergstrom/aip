import SidebarView from "../views/sidebarView";
import { useState } from "react";

const SidebarPresenter = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <SidebarView 
            showSidebar={showSidebar}
            toggleShowSidebar={toggleShowSidebar}
        />
    );
}

export default SidebarPresenter;
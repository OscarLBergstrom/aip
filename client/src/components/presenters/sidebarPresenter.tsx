import SidebarView from "../views/sidebarView";
import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const SidebarPresenter = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const ref = useOutsideClick(() => {
        if (showSidebar) {
            setShowSidebar(false);
        }
      });

    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div ref={ref}>
            <SidebarView 
                showSidebar={showSidebar}
                toggleShowSidebar={toggleShowSidebar}
            />
        </div>
    );
}

export default SidebarPresenter;
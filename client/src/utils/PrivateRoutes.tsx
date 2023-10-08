import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import HaipModel from "../models/model";

interface PrivateRoutesProps {
    model: HaipModel;
}

const PrivateRoutes:React.FC<PrivateRoutesProps> = ({ model }) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(model.loggedIn);

    const loggedInObserver = () => {
        setLoggedIn(model.loggedIn);
    };

    model.addObserver(loggedInObserver);

    return (
        loggedIn 
        ? <Outlet/> 
        : <Navigate to="/"/>
    );
}

export default PrivateRoutes;
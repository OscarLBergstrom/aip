import react from "react-dom"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes:any = (loggedIn: boolean) => {
    console.log(loggedIn)
    if(loggedIn){
        return <Outlet/>
    }
    else{
        return <Navigate to="/"/>
    }
}

export default PrivateRoutes
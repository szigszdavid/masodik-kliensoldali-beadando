import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectLoggedInUser } from "../state/authSlice"


export const RequireAuth = ({children}) => {

    if(window.localStorage.getItem("user") === null)
    {
        return <Navigate to="/login" replace/>;
    }

    return children;
}
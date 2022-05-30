import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectLoggedInUser } from "../state/authSlice"


export const RequireAuth = ({children}) => {

    let user = useSelector(selectLoggedInUser)

    if(!user && window.localStorage.getItem("user") === null)
    {
        return <Navigate to="/login" replace/>;
    }

    return children;
}
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser, logout } from "../state/authSlice"

export const AuthStatus = () => {
    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()

    if(!user)
    {
        return "You need to log in";
    }

    const handleLogoutButtonOnClick = () => {
        dispatch(logout());
        window.localStorage.setItem("user", null)
    }

    return (
        <p>You are logged in, {user.email}!
            <Button variant="dark" onClick={handleLogoutButtonOnClick}>Logout</Button>
        </p>
    )
}
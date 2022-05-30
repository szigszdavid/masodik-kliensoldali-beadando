import { Outlet } from "react-router-dom";
import { Menu } from "../menu/Menu";
import { AuthStatus } from "../login/AuthStatus";

export function Layout({children}) {
    return (
    <div className="ui container">
      <Menu />
      <Outlet />
    </div>
    )
}
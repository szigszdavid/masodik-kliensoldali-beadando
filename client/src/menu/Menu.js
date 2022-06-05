import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { selectEditableTaskList } from "../state/editableTaskSlice";

export function Menu() {

  const user = useSelector(selectLoggedInUser);
  const isEditable = useSelector(selectEditableTaskList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("USER!!: ", user, isEditable);

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    window.localStorage.removeItem("user");
    navigate("/", {replace: true})
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="home">Feladatsorok alkalmazás</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="taskbank">TaskBank</Nav.Link>
            <Nav.Link href="registration">Register</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            {user !== null || JSON.parse(window.localStorage.getItem("user")) !== null ?<Nav.Link href="usertasks">My TaskLists</Nav.Link> : <></>}
            {JSON.parse(window.localStorage.getItem("user")) && (window.localStorage.getItem("editableTaskList") !== null || isEditable) ?<Nav.Link href="editabletasklist">Editable TaskList</Nav.Link>  : <></>}
            {user !== null || JSON.parse(window.localStorage.getItem("user")) !== null ? <Nav.Link href="profile">Profile</Nav.Link> : <></>}
            {user !== null || JSON.parse(window.localStorage.getItem("user")) !== null ?<Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>  : <></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

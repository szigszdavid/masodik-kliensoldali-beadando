import { React, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useGetTaskListsLimitQuery, useGetTasksQuery } from "../state/tasksApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetTaskListsQuery } from "../state/tasksApiSlice";

export function Profile() {
  const [user, setUser] = useState({
    id: 0,
    username: "username1",
    emailAddress: "emailAddress1",
  });

  useEffect(() => {
    const userFromStorage = JSON.parse(window.localStorage.getItem("user"))
    setUser({
        id: userFromStorage.user.id,
        username : userFromStorage.user.fullname,
        emailAddress: userFromStorage.user.email,
    })
    console.log(userFromStorage.user.fullname)
  }, [])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetTaskListsLimitQuery()
  console.log(data);
  const handleLogoutButtonOnClick = () => {
    dispatch(logout());
    window.localStorage.removeItem("user");
    navigate("/", {replace: true})
  };

  return (
    <>
      <h1>Profile</h1>
      <Table>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.emailAddress}</td>
          </tr>
          <tr>
              <td>Number of tasks</td>
              <td>{data}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="dark" onClick={handleLogoutButtonOnClick}>
        Logout
      </Button>
    </>
  );
}

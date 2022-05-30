import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../state/authSlice";
import { useLoginMutation } from "../state/tasksApiSlice";

export function Login() {
  //const { loggedInUser, login, logout, registration } = useAuth();
  const [user, setUser] = useState({
    emailaddress: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailaddress: "",
    password: "",
  });

  let newErrors = {
    emailaddress: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Send POST request to server
      const result = await authLogin({
        //ez megy a post bodyjába
        email: user.emailaddress,
        password: user.password,
        strategy: "local",
      }).unwrap();

      // //Server response data to login action
      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
        })
      )
      //Set accessToken in localStorage
      window.localStorage.setItem("user",JSON.stringify(result));
      console.log(JSON.parse(window.localStorage.getItem("user")));

      navigate("/", {replace: true})
      
    } catch (err) {
      newErrors.emailaddress = "Login error";
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Email Address: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="email"
          name="emailaddress"
          value={user.emailaddress}
          autoFocus
          helperText={errors.emailaddress}
          onChange={handleChange}
          required
        />
        {errors.emailaddress}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Jelszó: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={passwordRef}
          type="password"
          name="password"
          value={user.password}
          helperText={errors.password}
          onChange={handleChange}
          required
        />
        {errors.password}
      </Form.Group>
      <hr />
      <Button variant="primary" type="submit">
        {" "}
        Login
      </Button>
    </Form>
  );
}

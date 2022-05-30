import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../state/authSlice";
import { useLoginMutation, useRegistrationMutation } from "../state/tasksApiSlice";

export function Registration() {
  //const { loggedInUser, login, logout, registration } = useAuth();
  const [user, setUser] = useState({
    username: "",
    emailAddress: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    emailAddress: "",
    password: "",
  });

  let newErrors = {
    username: "",
    emailAddress: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [authRegister] = useRegistrationMutation();
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Send POST request to server
      await authRegister({
        //ez megy a post bodyjába
        email: user.emailAddress,
        password: user.password,
        fullname: user.username,
      });

      console.log("Registraion done");

      // const result = await authLogin({
      //   //ez megy a post bodyjába
      //   email: user.emailaddress,
      //   password: user.password,
      //   strategy: "local",
      // }).unwrap();

      // // //Server response data to login action
      // dispatch(
      //   login({
      //     user: result.user,
      //     token: result.accessToken,
      //   })
      // );
      // console.log("Login token: ", result.accessToken);

      // //Set accessToken in localStorage
      // window.localStorage.setItem("user",JSON.stringify(result));
      // console.log(JSON.parse(window.localStorage.getItem("user")));

      navigate("/", {replace: true})
    } catch (err) {
      newErrors.emailaddress = "Register error";
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Felhasználónév: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="text"
          name="username"
          value={user.username}
          label="Felhasználónév"
          autoFocus
          error={errors.username !== undefined}
          helperText={errors.username}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {newErrors.emailAddress}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="email"
          name="emailAddress"
          value={user.emailAddress}
          label="Felhasználónév"
          autoFocus
          error={errors.emailAddress !== undefined}
          helperText={errors.emailAddress}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Jelszó: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={passwordRef}
          type="password"
          name="password"
          value={user.password}
          label="Jelszó"
          error={errors.password !== undefined}
          helperText={errors.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <hr />
      <Button variant="primary" type="submit">
        {" "}
        Registration
      </Button>
    </Form>
  );
}

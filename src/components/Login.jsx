import React, { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const { users, setIsAuth, setLoginUser } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerButton, setRegisterButton] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("All fields are required");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const userExist = users.find((user) => {
      if (user.username === username) return true;
      else return false;
    });
    if (!userExist || userExist.password !== password) {
      setError(true);
      setErrorMessage("Username or password is wrong");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setIsAuth(true);
    setLoginUser(userExist);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("All fields are required");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const userExist = users.find((user) => {
      if (user.username === username) return true;
      else return false;
    });
    if (userExist) {
      setError(true);
      setErrorMessage("User already exist");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const newUser = {
      username,
      password,
    };
    axios
      .post("http://localhost:3002/users", newUser)
      .then((res) => {
        setRegisterButton(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Form
        className="w-25"
        onSubmit={registerButton ? handleRegister : handleLogin}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          {registerButton ? "Register" : "Login"}
        </Button>
        {!registerButton && (
          <p
            className="text-secondary mt-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            Don't have an account?{" "}
            <Button
              variant="link"
              size="sm"
              onClick={() => setRegisterButton(true)}
            >
              Register
            </Button>
          </p>
        )}

        {error && (
          <p className="mt-3" style={{ textAlign: "center", color: "red" }}>
            {errorMessage}
          </p>
        )}
      </Form>
    </div>
  );
};

export default Login;

import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import Login from "./Login";
import ListTodos from "./ListTodos";

const Home = () => {
  const { todos, isAuth, loginUser } = useContext(GlobalContext);
  return (
    <Container>
      {!isAuth && <Login />}
      {isAuth && <ListTodos />}
    </Container>
  );
};

export default Home;

import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const { isAuth, loginUser, setIsAuth, setLoginUser } =
    useContext(GlobalContext);
  return (
    <Navbar bg="primary" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>My Contex API App</Navbar.Brand>
        {isAuth && (
          <div>
            <Button
              onClick={() => {
                setIsAuth(false);
                setLoginUser("");
              }}
            >
              Welcome {loginUser.username}! Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;

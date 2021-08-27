import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const ListTodos = () => {
  const [addButton, setAddButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { todos, loginUser, setTodos } = useContext(GlobalContext);
  const filteredTodos = todos.filter((todo) => {
    if (todo.userId === loginUser.id) return true;
    else return false;
  });
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (title === "") {
      setError(true);
      setErrorMessage("Your todo must contain at least a title");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const newTodo = {
      title,
      text,
      done: false,
      userId: loginUser.id,
      date: new Date().toLocaleString(),
    };
    axios
      .post("http://localhost:3002/todos", newTodo)
      .then((res) => {
        setTodos([res.data, ...todos]);
        setAddButton(false);
        setTitle("");
        setText("");
      })
      .catch((err) => console.log(err));
  };
  const handleDoneButton = (id) => {
    let findTodo = todos.find((todo) => {
      if (todo.id === id) return true;
      else return false;
    });
    findTodo = { ...findTodo, done: !findTodo.done };
    axios
      .put(`http://localhost:3002/todos/${id}`, findTodo)
      .then((res) => {
        axios
          .get("http://localhost:3002/todos")
          .then((response) => setTodos(response.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteButton = (id) => {
    axios
      .delete(`http://localhost:3002/todos/${id}`)
      .then((res) => {
        axios
          .get("http://localhost:3002/todos")
          .then((response) => setTodos(response.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const handleEditTodo = (e) => {
    e.preventDefault();
    if (editTitle === "") {
      setError(true);
      setErrorMessage("Title can't be empty");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const updatedTodo = { ...selectedTodo, title: editTitle, text: editText };
    axios
      .put(`http://localhost:3002/todos/${selectedTodo.id}`, updatedTodo)
      .then((res) => {
        axios
          .get("http://localhost:3002/todos")
          .then((response) => setTodos(response.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setEditButton(false);
  };
  return (
    <div>
      <h1 className="text-center mt-4">{loginUser.username}'s Todos</h1>
      <div className="mt-3 d-flex justify-content-center">
        <Button
          variant="outline-primary"
          onClick={() => setAddButton(!addButton)}
        >
          Add Todo
        </Button>
      </div>
      {addButton && (
        <div className="mt-3 d-flex justify-content-center">
          <Form className="w-25" onSubmit={handleAddTodo}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your text"
                autoComplete="off"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Save
            </Button>
            {error && (
              <p className="mt-3" style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Form>
        </div>
      )}
      {editButton && (
        <div className="mt-3 d-flex justify-content-center">
          <Form className="w-25" onSubmit={handleEditTodo}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Title"
                autoComplete="off"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your text"
                autoComplete="off"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Edit
            </Button>
            {error && (
              <p className="mt-3" style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
          </Form>
        </div>
      )}

      <Row className="mt-5">
        {filteredTodos.map((todo) => (
          <Col md={4} sm={6} key={todo.id}>
            <Card
              bg={todo.done ? "info" : "light"}
              key={todo.id}
              text={todo.done ? "white" : "dark"}
            >
              <Card.Header>{todo.title}</Card.Header>
              <Card.Body>
                <Card.Title>{todo.text}</Card.Title>
                <p
                  style={{
                    padding: "0px",
                    margin: "5px 0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{todo.date}</span>
                  <div>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleDeleteButton(todo.id);
                      }}
                    >
                      Delete
                    </Button>
                    {!todo.done && (
                      <Button
                        style={{ marginRight: "5px" }}
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setEditButton(!editButton);
                          setSelectedTodo(todo);
                          setEditTitle(todo.title);
                          setEditText(todo.text);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        handleDoneButton(todo.id);
                      }}
                    >
                      {todo.done ? "Undone" : "Done"}
                    </Button>
                  </div>
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListTodos;

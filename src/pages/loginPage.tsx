import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [isLogin, setIsLogin] = useState(true);

  const login = async (e: any) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        // Simulate token
        localStorage.setItem("email", response.data[0]["email"]);
      })
      .catch((error) => toast.error(error.response.data));
    window.location.href = "/home";
  };

  const register = async (e: any) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users`, {
        username,
        email,
        password,
      })
      .then(async (response) => {
        // Simulate token
        localStorage.setItem("email", response.data[0]["email"]);
        const userId = response.data[0]["_id"];
        console.log(userId);
        await axios
          .post(`${process.env.REACT_APP_API_URL}/portfolios`, {
            userId,
            value: portfolioValue,
            transactions: [],
          })
          .then((response) => {
            // Simulate token
            localStorage.setItem("email", response.data[0]["email"]);
          })
          .catch((error) => toast.error(error.response.data));
      })
      .catch((error) => toast.error(error.response.data));
    window.location.href = "/home";
  };

  const registerForm = (
    <Form className="container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setUsername(e.currentTarget.value)}
          type="text"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <p>Portfolio</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Starting Value</Form.Label>
        <Form.Control
          onChange={(e) => setPortfolioValue(+e.currentTarget.value)}
          type="text"
          placeholder="EnterPortfolio Value "
        />
      </Form.Group>
      <p className="link-tag" onClick={() => setIsLogin(true)}>
        Already have an account: Login here
      </p>
      <br />
      <Button onClick={register} variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );

  const loginForm = (
    <Form className="container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <p className="link-tag" onClick={() => setIsLogin(false)}>
        Don't have an account: Registe here
      </p>
      <br />
      <Button onClick={login} variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
  return <div>{isLogin ? loginForm : registerForm}</div>;
};

export default LoginPage;

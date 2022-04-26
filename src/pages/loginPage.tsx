import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  const login = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("email", response.data[0]["email"]);
      window.location.href = "/home";
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const register = async (e: any) => {
    e.preventDefault();
    try {
      // Add New user
      const user = await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
        username,
        email,
        password,
      });

      // Create user related portfolio
      console.log(user.data)
      const userId = user.data["_id"];

      const portfolio = await axios.post(
        `${process.env.REACT_APP_API_URL}/portfolios`,
        {
          userId,
          value: portfolioValue,
          transactions: [],
        }
      );

      // Simulate token
      localStorage.setItem("email", user.data["email"]);
      window.location.href = "/home";
    } catch (error: any) {
      toast.error(error.response.data);
    }
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

  if (localStorage.getItem("email")) history.push("/home");

  return <div>{isLogin ? loginForm : registerForm}</div>;
};

export default LoginPage;

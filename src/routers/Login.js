import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const nav = useNavigate();

  const validateLogin = () => {
    axios.post("/user/login", data).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        if (res.data.data === true) {
          localStorage.setItem("username", data.username);
          nav("/");
        } else {
          nav("/login");
        }
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={data.username}
        placeholder="Enter Username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      ></input>

      <input
        type="text"
        value={data.password}
        placeholder="Enter Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      ></input>
      <br />
      <button onClick={validateLogin}>Submit</button>

      <NavLink to="/register">Register</NavLink>
    </div>
  );
};

export default Login;

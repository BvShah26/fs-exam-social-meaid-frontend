import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const nav = useNavigate();

  const registerUser = () => {
    console.log(data);
    axios.post("/user/new", data).then((res) => {
      if (res.status === 200) {
        nav("/login");
      }
    });
  };
  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        value={data.username}
        placeholder="Enter Username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      ></input>

      <input
        type="password"
        value={data.password}
        placeholder="Enter Password"
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
          console.log(data);
        }}
      ></input>

      <br />
      <button onClick={registerUser}>Submit</button>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default Register;

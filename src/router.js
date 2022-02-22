import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPost from "./routers/EditPost";
import Home from "./routers/Home";
import Login from "./routers/Login";
import Logout from "./routers/Logout";
import Posts from "./routers/Posts";
import Register from "./routers/Register";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addPost" element={<Posts />}></Route>
          <Route path="/editPost/:id" element={<EditPost />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

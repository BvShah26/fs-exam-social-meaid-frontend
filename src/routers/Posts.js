import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const [data, setData] = useState({
    postId: "",
    postTitle: "",
    postData: "",
    username: localStorage.getItem("username"),
  });

  const nav = useNavigate();
  const addPost = () => {
    axios.post("/post/new", data).then((res) => {
      if (res.status === 200) {
        nav("/");
      }
    });
  };
  return (
    <div>
      <h1>Add Post</h1>

      <input
        type="text"
        value={data.postId}
        placeholder="Enter Id"
        onChange={(e) => setData({ ...data, postId: e.target.value })}
      ></input>

      <input
        type="text"
        value={data.postTitle}
        placeholder="Enter Title"
        onChange={(e) => setData({ ...data, postTitle: e.target.value })}
      ></input>

      <input
        type="text"
        value={data.postData}
        placeholder="Enter Data"
        onChange={(e) => setData({ ...data, postData: e.target.value })}
      ></input>
      <br />
      <button onClick={addPost}>Submit</button>

      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default Posts;

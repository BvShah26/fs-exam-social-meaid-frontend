import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [editPost, setEditPost] = useState();
  const nav = useNavigate();

  const fetch = () => {
    axios.get("/post/").then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
      }
    });
  };

  const getDataForEdit = (id, title, post, pid) => {
    setEditPost({
      _id: id,
      title,
      post,
      pid,
    });
    setEdit(true);
  };

  const updatePost = () => {
    console.log("getDataForEdit", editPost);
    axios
      .put(`/post/update/${editPost._id}`, {
        postId: editPost.pid,
        postTitle: editPost.title,
        postData: editPost.post,
        username: localStorage.getItem("username"),
      })
      .then((res) => {
        console.log("Update called", editPost);
        if (res.status === 200) {
          setEdit(false);
          setEditPost({});
          fetch();
        }
      });
  };

  const deleteData = (id) => {
    axios.delete(`post/delete/${id}`).then((res) => {
      if (res.status === 200) {
        console.log("deleted");
        fetch();
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      nav("/login");
    }
    fetch();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <NavLink to="/addPost">Add Post</NavLink>

      {edit && (
        <div>
          <h1>Edit Post</h1>
          {console.log(editPost)}

          <input
            type="text"
            defaultValue={editPost.title}
            placeholder="Enter Title"
            onChange={(e) =>
              setEditPost({ ...editPost, title: e.target.value })
            }
          ></input>

          <input
            type="text"
            defaultValue={editPost.post}
            placeholder="Enter Data"
            onChange={(e) => setEditPost({ ...editPost, post: e.target.value })}
          ></input>
          <br />
          <button onClick={updatePost}>Update</button>
          <button
            onClick={() => {
              setEdit(false);
              setEditPost({});
            }}
          >
            cancel
          </button>
        </div>
      )}

      {data && !edit && (
        <table>
          <thead>
            <tr>
              <td>Edit</td>
              <th>Title</th>
              <th>Data</th>
              <th>Username</th>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <td style={{ border: "1px solid black" }}>
                  {d.username === localStorage.getItem("username") ? (
                    <button
                      onClick={() =>
                        getDataForEdit(d._id, d.postTitle, d.postData, d.postId)
                      }
                    >
                      Edit
                    </button>
                  ) : (
                    ""
                  )}
                </td>
                <td style={{ border: "1px solid black" }}>{d.postTitle}</td>
                <td style={{ border: "1px solid black" }}>{d.postData}</td>
                <td style={{ border: "1px solid black" }}>{d.username}</td>
                <td style={{ border: "1px solid black" }}>
                  {d.username === localStorage.getItem("username") ? (
                    <button onClick={() => deleteData(d._id)}>Delete</button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

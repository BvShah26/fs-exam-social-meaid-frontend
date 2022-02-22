import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();
  return (
    <div>
      {localStorage.removeItem("username")}
      {nav("/login")}
    </div>
  );
};

export default Logout;

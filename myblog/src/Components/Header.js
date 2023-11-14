import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import logo from "../assets/Blogger.svg.png";
import { useState } from "react";
import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
export default function Header() {
  const navigate = useNavigate();
  console.log("IN header");
  // const [username, setUsername] = useState(null);
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        // setUsername(userInfo.username);
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    // navigate("/login");
    // window.location.reload();
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <p style={{ display: "flex" }}>
          <img src={logo} style={{ width: "30px", marginRight: "10px" }}></img>
          <span>My Blogs</span>
        </p>
      </Link>
      <nav>
        {username && (
          <>
            <h3>{username}</h3>
            <Link to="/create">Create Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import "../css/postPage.css";
import "../App.css";
import { UserContext } from "../Components/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        console.log(postInfo);
        setPostInfo(postInfo);
        setCover(postInfo.cover);
        setContent(postInfo.content);
      });
    });
  }, []);

  if (!postInfo) {
    return "No post found";
  }

  return (
    <div className="postPage">
      <h1>{postInfo.title}</h1>
      <p className="info">
        <span style={{ color: "gray", fontWeight: "bold" }}>Author: </span>
        <a href="/">{postInfo.author.username}</a>
        <br />
        <span style={{ color: "gray", fontWeight: "bold" }}>Created on: </span>
        <time>{format(new Date(postInfo.createdAt), "MMM d, yyy HH:mm")}</time>
      </p>
      {userInfo && userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link to={`/edit/${id}`} className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit the Post
          </Link>
        </div>
      )}
      <div style={{ marginLeft: "10%" }}></div>
      <div className="postImage" style={{ width: "100%" }}>
        <img
          src={"http://localhost:4000/" + cover}
          // style={{
          //   marginTop: "15px",
          //   maxWidth: "100%",
          // }}
        ></img>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ wordWrap: "break-word" }}
      />
    </div>
  );
}

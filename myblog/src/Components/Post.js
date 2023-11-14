import image1 from "../assets/img2.jpg";
import { formatISO9075 } from "date-fns";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../css/post.css";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover}></img>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          Author:
          <a href="/">{author.username}</a>
          Time:
          <time>{format(new Date(createdAt), "MMM d, yyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

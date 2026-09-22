import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function BlogCard({
  blog,
  deleteBlog,
  toggleFavourite
}) {
  const [showFullBlog, setShowFullBlog] = useState(false);

  return (
    <article className="blog-card">

      {/* TOP */}
      <div className="blog-card-top">

        <span className="blog-date">
          {blog.createdAt}
        </span>

        <button
          className={
            blog.favourite
              ? "favourite-btn favourite-active"
              : "favourite-btn"
          }
          onClick={() => toggleFavourite(blog.id)}
        >
          {blog.favourite ? "❤️" : "♡"}
        </button>

      </div>

      {/* TITLE */}
      <h3>{blog.title}</h3>

      {/* DESCRIPTION */}
      <p className="description">
        {blog.description}
      </p>

      {/* RATING */}
      <div className="blog-rating">

        <span className="stars">
          {"★".repeat(blog.rating)}
          {"☆".repeat(5 - blog.rating)}
        </span>

        <span>
          {blog.rating}/5
        </span>

      </div>

      {/* CONTENT */}
      {showFullBlog && (
        <div className="full-content">
          <p>{blog.content}</p>
        </div>
      )}

      {/* BUTTONS */}
      <div className="card-buttons">

        <button
          className="read-btn"
          onClick={() =>
            setShowFullBlog(!showFullBlog)
          }
        >
          {showFullBlog
            ? "Hide Blog"
            : "Read Blog"}
        </button>

        <button
          className="delete-btn"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this blog?"
              )
            ) {
              deleteBlog(blog.id);
            }
          }}
        >
          Delete
        </button>

      </div>

    </article>
  );
}

export default BlogCard;
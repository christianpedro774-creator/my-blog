
import { useState } from "react";

function BlogCard({ blog, deleteBlog }) {
  const [showFullBlog, setShowFullBlog] =
    useState(false);

  return (
    <article className="blog-card">

      {/* IMAGE */}
      <img
        className="blog-image"
        src={blog.image}
        alt={blog.title}
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/800x450?text=No+Image";
        }}
      />

      <div className="blog-card-content">

        {/* DATE */}
        <span className="blog-date">
          {blog.createdAt}
        </span>

        {/* TITLE */}
        <h3>
          {blog.title}
        </h3>

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

        {/* FULL CONTENT */}
        {showFullBlog && (
          <div className="full-content">
            <p>
              {blog.content}
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="card-buttons">

          <button
            className="read-btn"
            onClick={() =>
              setShowFullBlog(
                !showFullBlog
              )
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

      </div>

    </article>
  );
}

export default BlogCard;

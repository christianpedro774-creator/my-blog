
import { useState } from "react";

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title.trim() ||
      !image.trim() ||
      !description.trim() ||
      !content.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    addBlog(
      title,
      image,
      description,
      content,
      rating
    );

    // Clear form
    setTitle("");
    setImage("");
    setDescription("");
    setContent("");
    setRating(5);
  }

  return (
    <section className="form-section">

      <div className="section-heading">
        <p className="small-title">
          CREATE
        </p>

        <h2>
          Write a new blog
        </h2>
      </div>

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <div className="form-group">
          <label>
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        {/* IMAGE URL */}
        <div className="form-group">
          <label>
            Image URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          {image && (
            <img
              className="image-preview"
              src={image}
              alt="Blog preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onLoad={(e) => {
                e.currentTarget.style.display = "block";
              }}
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>
            Description
          </label>

          <input
            type="text"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        {/* CONTENT */}
        <div className="form-group">
          <label>
            Blog Content
          </label>

          <textarea
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />
        </div>

        {/* RATING */}
        <div className="form-group">
          <label>
            Rating
          </label>

          <div className="rating-selector">

            {[1, 2, 3, 4, 5].map(
              (number) => (
                <button
                  type="button"
                  key={number}
                  className={
                    number <= rating
                      ? "star selected"
                      : "star"
                  }
                  onClick={() =>
                    setRating(number)
                  }
                >
                  ★
                </button>
              )
            )}

          </div>
        </div>

        <button
          className="add-blog-btn"
          type="submit"
        >
          + Publish Blog
        </button>

      </form>

    </section>
  );
}

export default BlogForm;


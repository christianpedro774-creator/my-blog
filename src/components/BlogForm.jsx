
import { useEffect, useState } from "react";

function BlogForm({
  addBlog,
  updateBlog,
  editingBlog,
  cancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  // Fill form when editing a blog
  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setImage(editingBlog.image);
      setDescription(editingBlog.description);
      setContent(editingBlog.content);
      setRating(editingBlog.rating);
    }
  }, [editingBlog]);

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

    if (editingBlog) {
      // Update existing blog
      updateBlog(
        editingBlog.id,
        title,
        image,
        description,
        content,
        rating
      );
    } else {
      // Create new blog
      addBlog(
        title,
        image,
        description,
        content,
        rating
      );
    }

    clearForm();
  }

  function clearForm() {
    setTitle("");
    setImage("");
    setDescription("");
    setContent("");
    setRating(5);
  }

  function handleCancel() {
    clearForm();
    cancelEdit();
  }

  return (
    <section className="form-section">

      <div className="section-heading">

        <p className="small-title">
          {editingBlog ? "EDIT" : "CREATE"}
        </p>

        <h2>
          {editingBlog
            ? "Edit your blog"
            : "Write a new blog"}
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

        {/* IMAGE */}
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
                e.currentTarget.style.display =
                  "none";
              }}
              onLoad={(e) => {
                e.currentTarget.style.display =
                  "block";
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

        {/* BUTTONS */}
        <div className="form-actions">

          <button
            className="add-blog-btn"
            type="submit"
          >
            {editingBlog
              ? "✓ Update Blog"
              : "+ Publish Blog"}
          </button>

          {editingBlog && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </section>
  );
}

export default BlogForm;

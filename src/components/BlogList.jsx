
import BlogCard from "./BlogCard";

function BlogList({
  blogs,
  deleteBlog,
  startEdit,
}) {
  if (blogs.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          📝
        </div>

        <h3>
          No blogs found
        </h3>

        <p>
          Create your first blog and it
          will appear here.
        </p>

      </div>
    );
  }

  return (
    <section className="blog-section">

      <div className="section-heading">

        <p className="small-title">
          LATEST
        </p>

        <h2>
          Blog Posts
        </h2>

      </div>

      <div className="blog-grid">

        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            startEdit={startEdit}
          />
        ))}

      </div>

    </section>
  );
}

export default BlogList;


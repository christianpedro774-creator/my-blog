
import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("myBlogs");

    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [search, setSearch] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  // Save blogs to localStorage
  useEffect(() => {
    localStorage.setItem("myBlogs", JSON.stringify(blogs));
  }, [blogs]);

  // Add new blog
  function addBlog(title, image, description, content, rating) {
    const newBlog = {
      id: Date.now(),
      title,
      image,
      description,
      content,
      rating: Number(rating),
      createdAt: new Date().toLocaleDateString(),
    };

    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  }

  // Delete blog
  function deleteBlog(id) {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== id)
    );
  }

  // Start editing
  function startEdit(blog) {
    setEditingBlog(blog);

    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Update blog
  function updateBlog(
    id,
    title,
    image,
    description,
    content,
    rating
  ) {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              title,
              image,
              description,
              content,
              rating: Number(rating),
            }
          : blog
      )
    );

    // Exit edit mode
    setEditingBlog(null);
  }

  // Search blogs
  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title.toLowerCase().includes(searchText) ||
      blog.description.toLowerCase().includes(searchText) ||
      blog.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          My<span>Blog</span>
        </div>

        <p className="nav-text">
          My Personal Blog
        </p>
      </header>

      {/* HERO */}
      <section className="hero">
        <div>
          <p className="hero-small">
            WELCOME TO MY BLOG
          </p>

          <h1>
            Share your
            <span> thoughts.</span>
          </h1>

          <p>
            Write, save and organize your stories,
            ideas and tutorials.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="container">

        {/* BLOG FORM */}
        <BlogForm
          addBlog={addBlog}
          updateBlog={updateBlog}
          editingBlog={editingBlog}
          cancelEdit={() => setEditingBlog(null)}
        />

        {/* SEARCH */}
        <div className="search-section">

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="blog-count">
            {filteredBlogs.length} Blog
            {filteredBlogs.length !== 1
              ? "s"
              : ""}
          </div>

        </div>

        {/* BLOG LIST */}
        <BlogList
          blogs={filteredBlogs}
          deleteBlog={deleteBlog}
          startEdit={startEdit}
        />

      </main>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 MyBlog. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;


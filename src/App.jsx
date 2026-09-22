import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("myBlogs");

    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [search, setSearch] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem("myBlogs", JSON.stringify(blogs));
  }, [blogs]);

  // Add a new blog
  function addBlog(title, description, content, rating) {
    const newBlog = {
      id: Date.now(),
      title: title,
      description: description,
      content: content,
      rating: Number(rating),
      favourite: false,
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

  // Add/remove favourite
  function toggleFavourite(id) {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, favourite: !blog.favourite }
          : blog
      )
    );
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

  // Show only favourites
  const displayedBlogs = showFavourites
    ? filteredBlogs.filter((blog) => blog.favourite)
    : filteredBlogs;

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          My<span>Blog</span>
        </div>

        <nav>
          <button
            className={!showFavourites ? "nav-btn active" : "nav-btn"}
            onClick={() => setShowFavourites(false)}
          >
            Home
          </button>

          <button
            className={showFavourites ? "nav-btn active" : "nav-btn"}
            onClick={() => setShowFavourites(true)}
          >
            ❤️ Favourites
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div>
          <p className="hero-small">WELCOME TO MY BLOG</p>

          <h1>
            Share your
            <span> thoughts.</span>
          </h1>

          <p>
            Write, save and organize your favourite stories,
            ideas and tutorials.
          </p>
        </div>
      </section>

      {/* ADD BLOG */}
      <main className="container">

        <BlogForm addBlog={addBlog} />

        {/* SEARCH */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="blog-count">
            {showFavourites
              ? `❤️ ${displayedBlogs.length} Favourite${
                  displayedBlogs.length !== 1 ? "s" : ""
                }`
              : `${displayedBlogs.length} Blog${
                  displayedBlogs.length !== 1 ? "s" : ""
                }`}
          </div>
        </div>

        {/* BLOG LIST */}
        <BlogList
          blogs={displayedBlogs}
          deleteBlog={deleteBlog}
          toggleFavourite={toggleFavourite}
        />

      </main>

      {/* FOOTER */}
      <footer>
        <p>© 2026 MyBlog. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
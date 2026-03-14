import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Remove user info from localStorage
    localStorage.removeItem("loggedInUser");

    // ✅ Redirect to login page
    navigate("/login");
  };

    const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
 // send search term to parent component (like Feed)
  };

 return (
  <div className="navbar-container">
    <div className="search-bar">
       <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button>Search</button>
    </div>

    <nav className="navbar">
      <div className="logo"> Recipe Management</div>
      <ul className="nav-links">
      <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/recipe-profile">My Recipes </Link></li>
        <li><Link to="/add-recipe">Add Recipe</Link></li>
        <li><Link to="/user-profile">User Profile</Link></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>

    </nav>
    </div>
  );
}

export default Navbar;
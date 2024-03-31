import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import "../styles/NavBar.css"
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>AAK Science</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/auth" className="login-button">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;


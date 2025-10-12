'use client'; // For using useState and client-side interactions

import Link from 'next/link';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="website-header">
      <div className="header-container">
        
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <h1>कलुपुरा</h1>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/announcements">Annoucments</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Login/Signup Buttons */}
        <div className="auth-buttons">
          <Link href="/login" className="btn login-btn">Login</Link>
          <Link href="/signup" className="btn signup-btn">SignUp</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
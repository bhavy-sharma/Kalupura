'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsLoggedIn(true);
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();

    // Optional: Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileOpen(false);
    window.location.href = '/'; // Full reload to reset app state
  };

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
            <li><Link href="/announcements">Announcements</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Auth Section: Login/Signup OR Profile */}
        <div className="auth-section">
          {isLoggedIn ? (
            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile menu"
              >
                👤
              </button>
              {isProfileOpen && (
                <div className="profile-menu">
                  <div className="profile-user-info">
                    <span className="profile-name">
                      {user?.name || 'User'}
                    </span>
                    <span className="profile-role">
                      ({user?.role === 'admin' ? 'Admin' : 'Member'})
                    </span>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href="/login" className="btn login-btn">Login</Link>
              <Link href="/signup" className="btn signup-btn">SignUp</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Close profile dropdown if clicked outside */}
      {isProfileOpen && (
        <div
          className="dropdown-backdrop"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
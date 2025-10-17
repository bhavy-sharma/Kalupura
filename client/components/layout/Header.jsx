'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (e) {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  // ✅ Condition: Show "Chat" only if user is logged in AND isEnabled is true
  const shouldShowChat = isLoggedIn && user?.isEnabled === true;

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
            {/* ✅ Show Chat only if enabled */}
            {shouldShowChat && (
              <li><Link href="/chat">Chat</Link></li>
            )}
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Auth Section */}
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
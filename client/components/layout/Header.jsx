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
    setIsMenuOpen(false); // Close mobile menu on logout
    window.location.href = '/';
  };

  const shouldShowChat = isLoggedIn && user?.isEnabled === true;
  const canAddMember = isLoggedIn && (user?.role === 'admin' || user?.role === 'headOFFamily');

  // Close menus when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileOpen) setIsProfileOpen(false);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen, isMenuOpen]);

  return (
    <header className="website-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <h1>कलुपुरा</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-menu desktop-only">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            {shouldShowChat && <li><Link href="/chat">Chat</Link></li>}
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Desktop Auth (Profile) */}
        <div className="auth-section desktop-only">
          {isLoggedIn ? (
            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                aria-label="Profile menu"
              >
                👤
              </button>
              {isProfileOpen && (
                <div className="profile-menu">
                  <div className="profile-user-info">
                    <span className="profile-name">{user?.name || 'User'}</span>
                    <span className={`profile-role-badge role-${user?.role || 'member'}`}>
                      {user?.role === 'admin' ? 'Admin' : 
                       user?.role === 'headOFFamily' ? 'Head of Family' : 'Member'}
                    </span>
                  </div>
                  {canAddMember && (
                    <Link
                      href="/add-member"
                      className="profile-menu-link"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      ➕ Add Member
                    </Link>
                  )}
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
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
            setIsProfileOpen(false);
          }}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu (Full Overlay or Slide-in) */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="mobile-menu-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <h2>कलुपुरा</h2>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="close-mobile-menu">
                ✕
              </button>
            </div>

            <ul className="mobile-nav-list">
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              {shouldShowChat && (
                <li><Link href="/chat" onClick={() => setIsMenuOpen(false)}>Chat</Link></li>
              )}
              <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <li className="mobile-profile-section">
                  <div className="profile-info">
                    <span className="profile-name">{user?.name}</span>
                    <span className={`profile-role-badge role-${user?.role || 'member'}`}>
                      {user?.role === 'admin' ? 'Admin' : 
                       user?.role === 'headOFFamily' ? 'Head of Family' : 'Member'}
                    </span>
                  </div>
                  {canAddMember && (
                    <Link
                      href="/add-member"
                      className="mobile-menu-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ➕ Add Member
                    </Link>
                  )}
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    🚪 Logout
                  </button>
                </li>
              ) : (
                <li className="mobile-auth-buttons">
                  <Link href="/login" className="btn login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link href="/signup" className="btn signup-btn" onClick={() => setIsMenuOpen(false)}>SignUp</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Profile Dropdown Backdrop */}
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
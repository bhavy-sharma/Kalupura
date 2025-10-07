// components/layout/Header.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Mock auth state — replace with real context later
const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Simulate auth check
    const mockUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (mockUser) setUser(JSON.parse(mockUser));
  }, []);
  return { user };
};

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Families', href: '/families' },
    { name: 'Chat', href: '/chat' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 text-green">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-brown">Kalupura</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-medium text-gray-700 hover:text-green transition-colors ${
                pathname === item.href ? 'text-green font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-brown hover:text-green"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="px-4 py-2 bg-green text-white text-sm font-medium rounded-md hover:bg-emerald-600"
              >
                Profile
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-green text-white text-sm font-medium rounded-md hover:bg-emerald-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
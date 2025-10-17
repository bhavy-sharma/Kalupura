'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const res = await fetch('http://localhost:5000/api/v1/kalupra/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token && data.user) {
      // Save JWT token and user securely in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Role-based redirect as per your requirement
      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/choose'); 
        } else if (data.user.role === 'headOfFamily' || data.user.role === 'member') {
          router.push('/'); // home page
        } else {
          // Fallback: agar koi aur role ho (e.g., guest), to home pe bhejo
          router.push('/');
        }
      }, 800);
    } else {
      setError(data.message || 'लॉगिन विफल। कृपया पुनः प्रयास करें।');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('कुछ गड़बड़ हुई। कृपया अपना कनेक्शन जाँचें।');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-green-100 p-4">
      {/* Background Decorative Elements */}
      <div className="fixed top-10 left-10 text-6xl opacity-20">🌾</div>
      <div className="fixed top-20 right-20 text-4xl opacity-20">🚜</div>
      <div className="fixed bottom-16 left-20 text-5xl opacity-20">🏡</div>
      <div className="fixed bottom-24 right-16 text-3xl opacity-20">🐄</div>

      <div className="w-full max-w-md">
        {/* Village Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <span className="text-5xl mr-3">🌾</span>
            <h1 className="text-4xl font-bold text-amber-800">गाँव कलुपुरा</h1>
            <span className="text-5xl ml-3">🚜</span>
          </div>
          <p className="text-gray-600 text-lg">अपने खाते में लॉगिन करें</p>
          <p className="text-amber-600 text-sm mt-1">गाँव की डिजिटल डायरी में आपका स्वागत है</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-amber-300">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-3 font-medium text-lg">
                📧 ईमेल पता
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="apna@email.darsh"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-3 font-medium text-lg">
                🔐 पासवर्ड
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="आपका गुप्त पासवर्ड"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-6">
              <a
                href="/forgot-password"
                className="text-amber-600 hover:text-amber-800 text-sm font-medium hover:underline"
              >
                पासवर्ड भूल गए? 🤔
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">⏳</span>
                  लॉगिन हो रहा है...
                </>
              ) : (
                <>
                  <span className="mr-2">🌾</span>
                  गाँव में प्रवेश करें
                  <span className="ml-2">🚪</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-amber-200"></div>
            <span className="px-4 text-gray-500 text-sm">या</span>
            <div className="flex-1 border-t border-amber-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              नए सदस्य हैं?{' '}
              <a
                href="/signup"
                className="text-green-600 hover:text-green-800 font-semibold text-lg hover:underline"
              >
                यहाँ पंजीकरण करें 🌟
              </a>
            </p>
          </div>
        </div>

        {/* Village Footer */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-4 text-2xl opacity-60 mb-2">
            <span>🌻</span>
            <span>🐓</span>
            <span>🌽</span>
            <span>🚲</span>
            <span>🌳</span>
          </div>
          <p className="text-amber-700 text-sm">
            "गाँव कलुपुरा - जहाँ हर घर एक परिवार है"
          </p>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
            <span className="text-lg">📊</span>
            <p className="text-xs text-gray-600 mt-1">डैशबोर्ड</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg border border-green-200">
            <span className="text-lg">👨‍👩‍👧‍👦</span>
            <p className="text-xs text-gray-600 mt-1">परिवार</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
            <span className="text-lg">📱</span>
            <p className="text-xs text-gray-600 mt-1">आधुनिक</p>
          </div>
        </div>
      </div>
    </div>
  );
}
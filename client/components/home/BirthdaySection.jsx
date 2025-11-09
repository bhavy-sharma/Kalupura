// components/home/BirthdaySection.jsx
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BirthdaySection() {
  const [data, setData] = useState(null)
  const [wished, setWished] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Allowed roles (as per your schema)
    const allowedRoles = ['admin', 'headOFFamily', 'member']
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null

    if (!role || !allowedRoles.includes(role)) {
      setLoading(false)
      return
    }

    const fetchBirthdays = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/kalupra/birthdays')
        setData(res.data)
      } catch (err) {
        console.error('API Error:', err)
        setError('जन्मदिन डेटा लोड नहीं हो सका।')
      } finally {
        setLoading(false)
      }
    }

    fetchBirthdays()
  }, [])

  const handleWish = (id) => {
    setWished((prev) => new Set(prev).add(id))
    // Optional: send wish to backend
    alert('शुभकामनाएँ भेज दी गईं! 🎉 गाँव वालों को खुशी होगी!')
  }

  // Role check: if not allowed, show nothing
  const allowedRoles = ['admin', 'headOFFamily', 'member']
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
  if (!allowedRoles.includes(role)) return null

  if (loading) {
    return (
      <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200 max-w-2xl mx-auto text-center">
        <p className="text-amber-700">जन्मदिन लोड हो रहे हैं... 🌾</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200 max-w-2xl mx-auto text-center">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  const today = data?.todayBirthdays || []
  const upcoming = data?.upcomingBirthdays || []

  return (
    <div className="bg-gradient-to-br from-amber-50 to-green-50 rounded-xl p-4 mb-6 border border-amber-300 max-w-2xl mx-auto shadow-sm">
      <h2 className="text-xl font-bold text-center text-green-800 mb-3">🎉 गाँव के जन्मदिन 🎂</h2>
      <p className="text-center text-amber-700 text-sm mb-4">इस महीने के खुशी के दिन</p>

      {/* Today’s Birthdays – Highlighted */}
      {today.length > 0 && (
        <div className="mb-5 p-3 bg-gradient-to-r from-red-50 to-amber-100 border-l-4 border-red-500 rounded-lg">
          <h3 className="text-center font-bold text-red-700 text-lg">✨ आज का जन्मदिन! ✨</h3>
          {today.map((person) => (
            <div key={person._id} className="py-3 text-center">
              <p className="text-2xl font-bold text-green-700">{person.name}</p>
              <p className="text-amber-700 mt-1">को जन्मदिन की हार्दिक शुभकामनाएँ! 🌼</p>
              {!wished.has(person._id) ? (
                <button
                  onClick={() => handleWish(person._id)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition"
                >
                  🎊 शुभकामनाएँ दें
                </button>
              ) : (
                <p className="text-green-700 mt-2 font-medium">✅ आपने शुभकामनाएँ दे दी हैं!</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Birthdays */}
      {upcoming.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-amber-200">
          <h3 className="font-bold text-green-700 mb-2 text-center">आगे आने वाले जन्मदिन:</h3>
          <ul className="space-y-2">
            {upcoming.map((person) => (
              <li
                key={person._id}
                className="flex justify-between items-center bg-amber-50 px-3 py-2 rounded border border-amber-100"
              >
                <span className="text-green-800 font-medium">{person.name}</span>
                <span className="text-amber-700 bg-white px-2 py-1 rounded text-sm">
                  {person.day} तारीख
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No birthdays this month */}
      {today.length === 0 && upcoming.length === 0 && (
        <div className="text-center py-3 text-amber-700">
          <p>इस महीने कोई जन्मदिन नहीं है।</p>
          <p className="text-sm mt-1">लेकिन गाँव हमेशा खुश रहता है! 🌾</p>
        </div>
      )}

      {/* Debug Info (Optional - Remove in production) */}
      {data?.debug && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          {data.debug.total} लोग | महीना: {data.debug.currentMonth}
        </p>
      )}
    </div>
  )
}
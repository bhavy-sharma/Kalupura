// routes/birthdays.routes.js
import express from 'express'
import User from '../models/user.model.js'

const router = express.Router()

// Helper: Extract month from DOB string
function extractMonth(dobStr) {
  if (!dobStr) return null
  const separators = ['-', '/']
  for (const sep of separators) {
    if (dobStr.includes(sep)) {
      const parts = dobStr.split(sep).map(p => p.trim())
      if (parts.length === 3) {
        return parseInt(parts[1], 10)
      }
    }
  }
  return null
}

// Helper: Extract day from DOB string
function extractDay(dobStr) {
  if (!dobStr) return null
  const separators = ['-', '/']
  for (const sep of separators) {
    if (dobStr.includes(sep)) {
      const parts = dobStr.split(sep).map(p => p.trim())
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          return parseInt(parts[2], 10) // YYYY-MM-DD → DD
        } else {
          return parseInt(parts[0], 10) // DD-MM-YYYY → DD
        }
      }
    }
  }
  return null
}

// Helper: Get role from cookies
function getRoleFromCookies(cookieHeader) {
  if (!cookieHeader) return null
  const cookies = {}
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) cookies[name] = value
  })
  return cookies.role || null
}

// GET /api/v1/kalupra/birthdays
router.get('/birthdays', async (req, res) => {
  try {
    // ✅ Get role from cookies
    const role = getRoleFromCookies(req.headers.cookie)
    
    // Allowed roles (must match your schema)
    const allowedRoles = ['admin', 'headOFFamily', 'member']
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'अनधिकृत पहुँच' })
    }

    // Fetch all users with dob
    const users = await User.find({ dob: { $exists: true, $ne: null } }, 'name dob _id')

    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()

    const allWithMeta = users
      .map(u => {
        const month = extractMonth(u.dob)
        const day = extractDay(u.dob)
        return {
          _id: u._id.toString(),
          name: u.name,
          dob: u.dob,
          month,
          day,
          isToday: month === currentMonth && day === currentDay,
          isThisMonth: month === currentMonth
        }
      })
      .filter(u => u.month !== null && u.day !== null) // skip invalid DOB

    const todayBirthdays = allWithMeta.filter(u => u.isToday)
    const upcomingBirthdays = allWithMeta
      .filter(u => u.isThisMonth && !u.isToday)
      .sort((a, b) => a.day - b.day)

    res.json({
      todayBirthdays,
      upcomingBirthdays,
      debug: { role, currentMonth, currentDay, total: allWithMeta.length }
    })
  } catch (err) {
    console.error('Birthday API Error:', err)
    res.status(500).json({ error: 'सर्वर त्रुटि' })
  }
})

export default router
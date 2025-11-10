// server/routes/birthdays.routes.js
import express from 'express';
import User from '../models/user.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

function extractMonth(dobStr) {
  if (!dobStr) return null;
  const separators = ['-', '/'];
  for (const sep of separators) {
    if (dobStr.includes(sep)) {
      const parts = dobStr.split(sep).map(p => p.trim());
      if (parts.length === 3) return parseInt(parts[1], 10);
    }
  }
  return null;
}

function extractDay(dobStr) {
  if (!dobStr) return null;
  const separators = ['-', '/'];
  for (const sep of separators) {
    if (dobStr.includes(sep)) {
      const parts = dobStr.split(sep).map(p => p.trim());
      if (parts.length === 3) {
        return parts[0].length === 4 ? parseInt(parts[2], 10) : parseInt(parts[0], 10);
      }
    }
  }
  return null;
}

router.get('/birthdays', authMiddleware, async (req, res) => {
  try {
    const role = req.cookies.role;
    const allowedRoles = ['admin', 'headOFFamily', 'member'];
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'अनधिकृत पहुँच।' });
    }

    const users = await User.find({ dob: { $exists: true, $ne: null } }, 'name dob _id');
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    const allWithMeta = users
      .map(u => {
        const month = extractMonth(u.dob);
        const day = extractDay(u.dob);
        return {
          _id: u._id.toString(),
          name: u.name,
          dob: u.dob,
          month,
          day,
          isToday: month === currentMonth && day === currentDay,
          isThisMonth: month === currentMonth
        };
      })
      .filter(u => u.month !== null && u.day !== null);

    const todayBirthdays = allWithMeta.filter(u => u.isToday);
    const upcomingBirthdays = allWithMeta
      .filter(u => u.isThisMonth && !u.isToday)
      .sort((a, b) => a.day - b.day);

    res.json({
      todayBirthdays,
      upcomingBirthdays,
      debug: { role, currentMonth, currentDay, total: allWithMeta.length }
    });
  } catch (err) {
    console.error('Birthday API Error:', err);
    res.status(500).json({ error: 'सर्वर त्रुटि।' });
  }
});

export default router;
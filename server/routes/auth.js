// server/routes/auth.js
import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'ईमेल या पासवर्ड गलत है।' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('role', user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    let redirectUrl = '/';
    if (user.role === 'admin') {
      redirectUrl = '/choose';
    }

    // ✅ CHANGE THIS LINE — SEND success: true INSTEAD OF msg
    return res.json({
      success: true,        // ← ये जरूरी है!
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectUrl,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'सर्वर त्रुटि।' });
  }
}); 

export default router;
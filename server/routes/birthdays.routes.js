// server/routes/birthdays.routes.js
import express from 'express';
import User from '../models/user.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/birthdays', authMiddleware, async (req, res) => {
   try {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');        
    const todayMMDD = `${month}-${day}`; 

    const users = await User.find({
      dob: { $regex: `-${todayMMDD}$` }
    });

    if (users.length > 0) {
      return res.status(200).json({
        success: true,
        message: " Aaj kuch users ka janam din hai!",
        count: users.length,
        users: users.map(u => ({ name: u.name, dob: u.dob }))
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Aaj kisi ka janam din nahi hai।"
      });
    }
  } catch (error) {
    console.error('Error in findBirthday:', error);
    return res.status(500).json({
      success: false,
      message: "Server error!"
    });
  }
});

export default router;
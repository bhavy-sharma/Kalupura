// routes/auth.js (or wherever your login route is)
import express from "express";
const router = express.Router();


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let redirectUrl = "/";
    if (user.role === "admin") {
      redirectUrl = "/choose";
    } else if (user.role === "headOfFamily" || user.role === "member") {
      redirectUrl = "/";
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // ... other fields you need on frontend
      },
      redirectUrl, 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
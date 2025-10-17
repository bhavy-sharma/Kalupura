import Complaint from "../models/contact.model.js";
import InfoVillage from "../models/infoVillage.model.js";
import SpecialEvent from "../models/specialEvent.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//  Add Complaint
export const AddComplaint = async (req, res) => {
  try {
    const { name, email, phone, subject, msg } = req.body;

    if (!name || !email || !phone || !subject || !msg) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = await Complaint.create({ name, email, phone, subject, msg });
    res.status(201).json(newComplaint);
  } catch (error) {
    console.error("Error adding complaint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Get All Complaints
export const GetComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Delete Complaint by ID
export const DeleteComplaint = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Special Event Model
export const AddSpecialEvent = async (req, res) => {
  try {
    const { imageUrl, title, type, description, date, location } = req.body;

    if (!imageUrl || !title || !type || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEvent= await SpecialEvent.create({ imageUrl, title, type, description, date, location });
   return res.status(201).json({msg:"Event Created Successfully", newEvent});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// delete Special Event by ID
export const DeleteSpecialEvent = async (req, res) => {
  try {
    const {id}= req.params;
    if(!id){
      return res.status(400).json({message:"ID is required"});
     }
      const deletedEvent= await SpecialEvent.findByIdAndDelete(id);
      if(!deletedEvent){
      return res.status(404).json({message:"Event not found"});
      }
      return res.status(200).json({message:"Event deleted successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
}

// Get All Special Events
export const GetSpecialEvent = async (req, res) => {
  try {
    const events = await SpecialEvent.find();
    return res.status(200).json({events});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//vilage info model
export const AddInfoVillage = async (req, res) => {
  try {
    console.log("req.body:", req.body); // ✅ debug line
    const { imageUrl, title, description } = req.body || {};

    if (!imageUrl || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInfoVillage = await InfoVillage.create({ imageUrl, title, description });

    return res.status(201).json({ msg: "InfoVillage Created Successfully", newInfoVillage });
  } catch (error) {
    console.error("AddInfoVillage error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete InfoVillage by ID
export  const DeleteInfoVillage = async (req, res) => {
  try {
     const {id}= req.params;
     if(!id){
      return res.status(400).json({message:"ID is required"});
     }
     const deletedInfoVillage= await InfoVillage.findByIdAndDelete(id);
     if(!deletedInfoVillage){
      return res.status(404).json({message:"InfoVillage not found"});
     }
     return res.status(200).json({message:"InfoVillage deleted successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
}


// Get All InfoVillage
export const GetInfoVillage = async (req, res) => {
  try {
    const infoVillage = await InfoVillage.find();
    return res.status(200).json({infoVillage});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//create user
export const createUser = async (req, res) => {
  try {
    
    const { name, fatherName, motherName, grandfatherName, grandmotherName, dob, dobTime, qualification,gender,phoneNumber,age, occupation, maritalStatus, marriageDate, dharam, jaati, hasVehicle, vehicleCount, vehicles,aadharNumber,panCardNumber, headOfFamilyName, email, password, role, memberOfFamily } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    if (!name || !fatherName || !motherName || !email || !password) {
      return res.status(400).json({ message: "Name, Father Name, Mother Name, Email, and Password are required" });
    }
    const newUser = await User.create({ name, fatherName, motherName, grandfatherName, grandmotherName, dob, dobTime, qualification,gender,phoneNumber,age, occupation, maritalStatus, marriageDate, dharam, jaati, hasVehicle, vehicleCount, vehicles,aadharNumber,panCardNumber, headOfFamilyName, email, password, role, memberOfFamily });
    return res.status(201).json({ msg: "User Created Successfully", newUser });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//update user by member of family
export const addMembersToFamily = async (req, res) => {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, newMembers } = req.body;

   
    if (!email || !newMembers ) {
      return res.status(400).json({ 
        message: "Email and newMembers (array) are required" 
      });
    }

   
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { memberOfFamily: { $each: newMembers } } },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      msg: "Members added successfully", 
      user: updatedUser 
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update user isEnabled by admin
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isEnable } = req.body; // Expecting { isEnabled: true }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isEnabled: isEnable }, // or just { isEnabled }
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User status updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    // 🔍 Find user by email only
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }


    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ message: "JWT Secret not configured" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "7d" }
    );

    // 📤 Send user data (including isEnabled)
    const { password: _, ...safeUser } = user._doc; // Exclude password

    return res.status(200).json({
      msg: "Login Successful",
      user: safeUser, // ✅ Now includes isEnabled, vehicles, etc.
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

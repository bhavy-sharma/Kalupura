import Complaint from "../models/contact.model.js";
import InfoVillage from "../models/infoVillage.model.js";
import SpecialEvent from "../models/specialEvent.model.js";

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


// Get All InfoVillage
export const GetInfoVillage = async (req, res) => {
  try {
    const infoVillage = await InfoVillage.find();
    return res.status(200).json({infoVillage});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

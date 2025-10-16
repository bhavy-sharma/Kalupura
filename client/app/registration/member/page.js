"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function UserRegister() {
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    grandmotherName: "",
    dob: "",
    dobTime: "",

    // Education & Work
    qualification: "",
    occupation: "",

    // Marital & Social
    maritalStatus: "single",
    marriageDate: "",
    dharam: "",
    jaati: "",

    // Head of Family & Auth
    headOfFamilyName: "",
    email: "",
    password: "",
    role: "member",
    memberOfFamily: ["no"],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/kalupra/createuser", formData);
      // member name or headof email
      console.log(res.data);
      alert("User Registered Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Register User");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
          🧾 User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              value={formData.fatherName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="motherName"
              placeholder="Mother Name"
              value={formData.motherName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="grandfatherName"
              placeholder="Grandfather Name"
              value={formData.grandfatherName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="grandmotherName"
              placeholder="Grandmother Name"
              value={formData.grandmotherName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="input"
            />
            <input
              type="time"
              name="dobTime"
              placeholder="DOB Time"
              value={formData.dobTime}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Education & Work */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Marital & Social */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Marital Status</label>
  <select
    name="maritalStatus"
    value={formData.maritalStatus}
    onChange={handleChange}
    className="input"
  >
    <option value="single">Single</option>
    <option value="married">Married</option>
    <option value="divorced">Divorced</option>
    <option value="widowed">Widowed</option>
  </select>
</div>

{formData.maritalStatus === "married" && (
  <div>
    <label>Marriage Date</label>
    <input
      type="date"
      name="marriageDate"
      value={formData.marriageDate}
      onChange={handleChange}
      className="input"
    />
  </div>
)}

        <input
              type="text"
              name="dharam"
              placeholder="Dharam"
              value={formData.jaati}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="jaati"
              placeholder="Jaati"
              value={formData.jaati}
              onChange={handleChange}
              className="input"
            />
            
          </div>

          {/* Head of Family & Auth */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="headOfFamilyName"
              placeholder="Head of Family Name"
              value={formData.headOfFamilyName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-4 font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register User
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default UserRegister;

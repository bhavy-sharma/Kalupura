"use client";
import axios from "axios";
import React, { useState } from "react";
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
    marriageDate: "" || "user is not married",
    dharam: "",
    jaati: "",

    // Vehicles
    hasVehicle: false,
    vehicleCount: 1,
    vehicles: [{ type: "", numberPlate: "", purchaseDate: "", insuranceExpiry: "" }],

    // Head of Family & Auth
    headOfFamilyName: "",
    email: "",
    password: "",
    role: "admin",
    memberOfFamily: ["no"],
    isEnabled: true,
  });

  const handleChange = (e, index, field) => {
    const { name, value, type, checked } = e.target;

    if (name === "hasVehicle") {
      setFormData({ ...formData, hasVehicle: checked });
    } else if (field === "vehicles") {
      const newVehicles = [...formData.vehicles];
      newVehicles[index][name] = value;
      setFormData({ ...formData, vehicles: newVehicles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addVehicle = () => {
    setFormData({
      ...formData,
      vehicles: [...formData.vehicles, { type: "", numberPlate: "", purchaseDate: "", insuranceExpiry: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/kalupra/createuser", formData);
      console.log(res);
      alert("User Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Register User");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
          🧾 User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label>Father Name</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Mother Name</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Grandfather Name</label>
              <input type="text" name="grandfatherName" value={formData.grandfatherName} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Grandmother Name</label>
              <input type="text" name="grandmotherName" value={formData.grandmotherName} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>DOB Time</label>
              <input type="time" name="dobTime" value={formData.dobTime} onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Education & Work */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Qualification</label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="input" />
            </div>
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

            <div>
              <label>Dharam</label>
              <input type="text" name="dharam" value={formData.dharam} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Jaati</label>
              <input type="text" name="jaati" value={formData.jaati} onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Vehicles */}
          <div>
            <label>
              <input type="checkbox" name="hasVehicle" checked={formData.hasVehicle} onChange={handleChange} /> Has Vehicle
            </label>
          </div>
          {formData.hasVehicle &&
            formData.vehicles.map((v, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input type="text" name="type" placeholder="Type" value={v.type} onChange={(e) => handleChange(e, i, "vehicles")} className="input" />
                <input type="text" name="numberPlate" placeholder="Number Plate" value={v.numberPlate} onChange={(e) => handleChange(e, i, "vehicles")} className="input" />
                <input type="date" name="purchaseDate" placeholder="Purchase Date" value={v.purchaseDate} onChange={(e) => handleChange(e, i, "vehicles")} className="input" />
                <input type="date" name="insuranceExpiry" placeholder="Insurance Expiry" value={v.insuranceExpiry} onChange={(e) => handleChange(e, i, "vehicles")} className="input" />
              </div>
            ))}
          {formData.hasVehicle && (
            <button type="button" onClick={addVehicle} className="bg-green-500 text-white px-3 py-1 rounded mt-2">
              + Add Vehicle
            </button>
          )}

          {/* Head of Family & Auth */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Head of Family Name</label>
              <input type="text" name="headOfFamilyName" value={formData.headOfFamilyName} onChange={handleChange} className="input" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" required />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
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

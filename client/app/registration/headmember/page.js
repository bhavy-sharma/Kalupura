"use client";
import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Headmember() {
  const [uploadData, setUploadData] = useState({
    HeadOfFamily: "",
    MemberName:[],
    email:"",
    password:"",
    VillageName: "",
    phoneNumber: "",
    age: "",
    gender: "",
    occupation: "",
    AadhaarNumber: "",
    PencardNumber: "",
  });

  const handleChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/addmember", {
         HeadOfFamily: uploadData.HeadOfFamily,
         email:uploadData.email,
         password:uploadData.password,
      VillageName: uploadData.VillageName,
      phoneNumber: uploadData.phoneNumber,
      age: uploadData.age,
      gender: uploadData.gender,
      occupation: uploadData.occupation,
      AadhaarNumber: uploadData.AadhaarNumber,
      PencardNumber: uploadData.PencardNumber,
      role: "headOfFamily",              
      roomID: "Chat" 
      });
      console.log(res);
      alert("Member Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Register Member");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
          🧾 Admin Member Registration
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Head Of Family
            </label>
            <input
              type="text"
              name="HeadOfFamily"
              value={uploadData.HeadOfFamily}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Village Name
            </label>
            <input
              type="text"
              name="VillageName"
              value={uploadData.VillageName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              {/* <label className="block text-sm font-medium text-gray-600">
                Room ID
              </label>
              <input
                type="text"
                name="roomID"
                value={uploadData.roomID}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              /> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={uploadData.phoneNumber}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={uploadData.age}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                value={uploadData.gender}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={uploadData.occupation}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Aadhaar Number
              </label>
              <input
                type="text"
                name="AadhaarNumber"
                value={uploadData.AadhaarNumber}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                PAN Card Number
              </label>
              <input
                type="text"
                name="PencardNumber"
                value={uploadData.PencardNumber}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-4 font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register Member
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Headmember;

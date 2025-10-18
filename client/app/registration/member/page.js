"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function UserRegister() {
  const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    grandmotherName: "",
    dob: "",
    dobTime: "",
    age: "", // 👈 Added age field
    gender: ""||"male",
    phoneNumber: "",

    // Education & Work
    qualification: "",
    occupation: "",

    // Marital & Social
    maritalStatus: "single",
    marriageDate: "",
    dharam: "",
    jaati: "",
    aadharNumber: "",
    panCardNumber: "",

    // Head of Family & Auth
    headOfFamilyName: "",
    email: "",
    password: "",
    role: "member",
    memberOfFamily: ["no"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      console.log( "userData.email",userData.email, "formData.name",formData.name);
      const res = await axios.post("http://localhost:5000/api/v1/kalupra/cerateMember", formData);
      if (userData?.email) {
        await axios.patch("http://localhost:5000/api/v1/kalupra/updatemember", { 
          email: userData.email, 
          newMembers: [formData.name] 
        });
      }
      alert("User Registered Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Register Users");
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-amber-50 p-4 flex justify-center items-start pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white border-2 border-amber-800 rounded-xl shadow-md p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">ग्रामीण पंजीकरण फॉर्म</h2>
          <p className="text-amber-700 mt-1">कृपया अपना विवरण भरें</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="नाम"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="text"
              name="fatherName"
              placeholder="पिता का नाम"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              name="motherName"
              placeholder="माता का नाम"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              name="grandfatherName"
              placeholder="दादा/नाना का नाम"
              value={formData.grandfatherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              name="grandmotherName"
              placeholder="दादी/नानी का नाम"
              value={formData.grandmotherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="time"
              name="dobTime"
              value={formData.dobTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {/* 👇 Age Field Added Here */}
            <input
              type="number"
              name="age"
              placeholder="आयु (वर्ष में)"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="120"
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
               required
            />
          </div>

          {/* Education & Work */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="qualification"
              placeholder="शैक्षणिक योग्यता"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              name="occupation"
              placeholder="व्यवसाय"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Marital & Social */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-800 text-sm mb-1">वैवाहिक स्थिति</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="single">अविवाहित</option>
                <option value="married">विवाहित</option>
                <option value="divorced">तलाकशुदा</option>
                <option value="widowed">विधवा/विधुर</option>
              </select>
            </div>

            {formData.maritalStatus === "married" && (
              <div>
                <label className="block text-amber-800 text-sm mb-1">विवाह तिथि</label>
                <input
                  type="date"
                  name="marriageDate"
                  value={formData.marriageDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            <div>
              <label className="block text-amber-800 text-sm mb-1">धर्म</label>
              <select
                name="dharam"
                value={formData.dharam}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">चुनें</option>
                <option value="हिंदू">हिंदू</option>
                <option value="मुस्लिम">मुस्लिम</option>
                <option value="ईसाई">ईसाई</option>
                <option value="सिख">सिख</option>
                <option value="बौद्ध">बौद्ध</option>
                <option value="जैन">जैन</option>
                <option value="अन्य">अन्य</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-800 text-sm mb-1">जाति</label>
              <select
                name="jaati"
                value={formData.jaati}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">चुनें</option>
                <option value="general">सामान्य</option>
                <option value="obc">ओबीसी</option>
                <option value="sc">अनुसूचित जाति (SC)</option>
                <option value="st">अनुसूचित जनजाति (ST)</option>
                <option value="other">अन्य</option>
              </select>
            </div>
          </div>

          {/* Aadhar & PAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="aadharNumber"
              placeholder="आधार कार्ड संख्या (12 अंक)"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              pattern="\d{12}"
              title="कृपया 12 अंकों का आधार नंबर दर्ज करें"
            />
            <input
              type="text"
              name="panCardNumber"
              placeholder="पैन कार्ड संख्या (10 अक्षर/अंक)"
              value={formData.panCardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="उदाहरण: ABCDE1234F"
            />
          </div>

          {/* Head of Family & Auth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="headOfFamilyName"
              placeholder="परिवार के मुखिया का नाम"
              value={formData.headOfFamilyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="email"
              name="email"
              placeholder="ईमेल"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="पासवर्ड"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg mt-4 transition duration-200"
          >
            पंजीकरण करें
          </motion.button>
        </form>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}

export default UserRegister;
"use client";
import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    age: "",
    gender: "", // Added
    phoneNumber: "", // Added
    aadharNumber: "", // Added
    panNumber: "", // Added

    // Education & Work
    qualification: "",
    occupation: "",

    // Marital & Social
    maritalStatus: "single",
    marriageDate: "",
    dharam: "", // Now a select
    jaati: "", // Now a select

    // Vehicles
    hasVehicle: false,
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
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-start pt-8 pb-12 px-4 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-amber-50 border-2 border-amber-700 rounded-xl shadow-lg p-6 relative overflow-hidden"
          style={{
            boxShadow: '0 10px 25px rgba(120, 80, 40, 0.2)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23d97706\" fill-opacity=\"0.06\" fill-rule=\"evenodd\"/%3E%3C/svg%3E")',
          }}
        >
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800"></div>

          <h2 className="text-2xl font-bold text-center mb-6 text-amber-900 tracking-wide">
            🏡 ग्रामीण पंजीकरण फॉर्म
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "नाम", name: "name", required: true },
                { label: "पिता का नाम", name: "fatherName" },
                { label: "माता का नाम", name: "motherName" },
                { label: "दादा/नाना का नाम", name: "grandfatherName" },
                { label: "दादी/नानी का नाम", name: "grandmotherName" },
                { label: "जन्म तिथि", name: "dob", type: "date" },
                { label: "जन्म समय", name: "dobTime", type: "time" },
                { label: "आयु (वर्ष में)", name: "age", type: "number" },
                { label: "लिंग", name: "gender", type: "select" },
                { label: "मोबाइल नंबर", name: "phoneNumber", type: "tel", required: true },
                { label: "आधार कार्ड नंबर", name: "aadharNumber", type: "text", maxLength: 12 },
                { label: "पैन कार्ड नंबर", name: "panNumber", type: "text", maxLength: 10 },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-amber-800 text-sm font-medium mb-1">{field.label}</label>
                  {field.type === "select" && field.name === "gender" ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                    >
                      <option value="">चुनें</option>
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                  ) : field.type === "select" && field.name === "jaati" ? (
                    <select
                      name="jaati"
                      value={formData.jaati}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                    >
                      <option value="">चुनें</option>
                      <option value="General">General</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="OBC">OBC</option>
                      <option value="Other">अन्य</option>
                    </select>
                  ) : field.type === "select" && field.name === "dharam" ? (
                    <select
                      name="dharam"
                      value={formData.dharam}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                    >
                      <option value="">चुनें</option>
                      <option value="Hindu">हिंदू</option>
                      <option value="Muslim">मुस्लिम</option>
                      <option value="Christian">ईसाई</option>
                      <option value="Sikh">सिख</option>
                      <option value="Buddhist">बौद्ध</option>
                      <option value="Jain">जैन</option>
                      <option value="Other">अन्य</option>
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      min={field.name === "age" ? "0" : undefined}
                      max={field.name === "age" ? "120" : undefined}
                      maxLength={field.maxLength || undefined}
                      pattern={field.name === "aadharNumber" ? "[0-9]{12}" : field.name === "panNumber" ? "[A-Z]{5}[0-9]{4}[A-Z]{1}" : undefined}
                      className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white placeholder-amber-400 text-amber-900"
                      placeholder={
                        field.name === "aadharNumber"
                          ? "12 अंक (बिना स्पेस)"
                          : field.name === "panNumber"
                          ? "ABCDE1234F"
                          : ""
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Education & Work */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">शैक्षणिक योग्यता</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white placeholder-amber-400 text-amber-900"
                />
              </div>
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">व्यवसाय</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white placeholder-amber-400 text-amber-900"
                />
              </div>
            </div>

            {/* Marital & Social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">वैवाहिक स्थिति</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                >
                  <option value="single">अविवाहित</option>
                  <option value="married">विवाहित</option>
                  <option value="divorced">तलाकशुदा</option>
                  <option value="widowed">विधवा/विधुर</option>
                </select>
              </div>

              {formData.maritalStatus === "married" && (
                <div>
                  <label className="block text-amber-800 text-sm font-medium mb-1">विवाह तिथि</label>
                  <input
                    type="date"
                    name="marriageDate"
                    value={formData.marriageDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                  />
                </div>
              )}

              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">धर्म</label>
                <select
                  name="dharam"
                  value={formData.dharam}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                >
                  <option value="">चुनें</option>
                  <option value="Hindu">हिंदू</option>
                  <option value="Muslim">मुस्लिम</option>
                  <option value="Christian">ईसाई</option>
                  <option value="Sikh">सिख</option>
                  <option value="Buddhist">बौद्ध</option>
                  <option value="Jain">जैन</option>
                  <option value="Other">अन्य</option>
                </select>
              </div>
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">जाति</label>
                <select
                  name="jaati"
                  value={formData.jaati}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                >
                  <option value="">चुनें</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="Other">अन्य</option>
                </select>
              </div>
            </div>

            {/* Vehicles */}
            <div className="pt-2">
              <label className="inline-flex items-center text-amber-800">
                <input
                  type="checkbox"
                  name="hasVehicle"
                  checked={formData.hasVehicle}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="ml-2 font-medium">क्या आपके पास वाहन है?</span>
              </label>
            </div>

            {formData.hasVehicle &&
              formData.vehicles.map((v, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-amber-100 rounded-lg border border-amber-300">
                  <input
                    type="text"
                    name="type"
                    placeholder="वाहन प्रकार (जैसे: ट्रैक्टर, बाइक)"
                    value={v.type}
                    onChange={(e) => handleChange(e, i, "vehicles")}
                    className="w-full px-3 py-2 border border-amber-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-amber-50 text-amber-900 placeholder-amber-500"
                  />
                  <input
                    type="text"
                    name="numberPlate"
                    placeholder="नंबर प्लेट"
                    value={v.numberPlate}
                    onChange={(e) => handleChange(e, i, "vehicles")}
                    className="w-full px-3 py-2 border border-amber-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-amber-50 text-amber-900 placeholder-amber-500"
                  />
                  <input
                    type="date"
                    name="purchaseDate"
                    value={v.purchaseDate}
                    onChange={(e) => handleChange(e, i, "vehicles")}
                    className="w-full px-3 py-2 border border-amber-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-amber-50 text-amber-900"
                  />
                  <input
                    type="date"
                    name="insuranceExpiry"
                    value={v.insuranceExpiry}
                    onChange={(e) => handleChange(e, i, "vehicles")}
                    className="w-full px-3 py-2 border border-amber-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-amber-50 text-amber-900"
                  />
                </div>
              ))}

            {formData.hasVehicle && (
              <button
                type="button"
                onClick={addVehicle}
                className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
              >
                + वाहन जोड़ें
              </button>
            )}

            {/* Head of Family & Auth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">परिवार के मुखिया का नाम</label>
                <input
                  type="text"
                  name="headOfFamilyName"
                  value={formData.headOfFamilyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                />
              </div>
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">ईमेल</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                />
              </div>
              <div>
                <label className="block text-amber-800 text-sm font-medium mb-1">पासवर्ड</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg mt-4 transition duration-200 shadow-md"
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
"use client"
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { set } from 'mongoose'

const ContactPage = () => {
  const [uploadData, setUploadData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    msg: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/kalupra/addcomplaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: uploadData.name,
          email: uploadData.email,
          phone: uploadData.phone,
          subject: uploadData.subject,
          msg: uploadData.msg,
        }),
      });
      if (res.ok) {
        alert("आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे!");
        setUploadData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          msg: "",
        });
        setIsLoading(false);
      } else {
        alert("संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें।");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें।");
    }
  }


  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-800">संपर्क करें</h1>
          <p className="text-gray-600 mt-2">हमसे जुड़ने में झिझकें नहीं — आपका संदेश हमारे लिए महत्वपूर्ण है!</p>
        </div>

        {/* Main Contact Section */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: Contact Info */}
          <div className="lg:w-1/3 bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">हमसे संपर्क करें</h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-800">पता:</p>
                <p className="text-gray-600">ग्राम पंचायत कार्यालय, कलुपुरा,<br />जिला – [अपना जिला], राज्य – [अपना राज्य],<br />पिन कोड – [XXXXXX]</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">मोबाइल नंबर:</p>
                <p className="text-gray-600">+91 XXXXX XXXXX</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">ईमेल:</p>
                <p className="text-gray-600">kalupura.panchayat@example.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">कार्यालय समय:</p>
                <p className="text-gray-600">सुबह 9:00 बजे से शाम 5:00 बजे तक<br />(सोमवार से शनिवार)</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">हमें संदेश भेजें</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">आपका नाम *</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="अपना नाम लिखें"
                    value={uploadData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">मोबाइल नंबर *</label>
                  <input
                    type="tel"
                    name="phone"
                    min={10}
                    max={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="10 अंकों का नंबर"
                    value={uploadData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">ईमेल (वैकल्पिक)</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="आपका ईमेल"
                  value={uploadData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">विषय *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={uploadData.subject}
                  name="subject"
                  onChange={handleChange}
                  required
                >
                  <option value="">चुनें...</option>
                  <option value="panchayat">पंचायत से संबंधित</option>
                  <option value="scheme">योजना/सुविधा के बारे में</option>
                  <option value="complaint">शिकायत</option>
                  <option value="suggestion">सुझाव</option>
                  <option value="other">अन्य</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">संदेश *</label>
                <textarea
                  rows="5"
                  name="msg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="अपना संदेश यहाँ लिखें..."
                  value={uploadData.msg}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading} // ✅ Disable button while loading
                className={`${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  } text-white font-semibold py-2 px-6 rounded-md transition duration-200 flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    भेजा जा रहा है...
                  </>
                ) : (
                  "संदेश भेजें"
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default ContactPage
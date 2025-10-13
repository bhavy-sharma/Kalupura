import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const ContactPage = () => {
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">आपका नाम *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="अपना नाम लिखें"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">मोबाइल नंबर *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="10 अंकों का नंबर"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">ईमेल (वैकल्पिक)</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="आपका ईमेल"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">विषय *</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="अपना संदेश यहाँ लिखें..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
              >
                संदेश भेजें
              </button>
            </form>
          </div>
        </div>

        {/* Optional: Google Map Placeholder */}
        <div className="mt-12 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">हमारा स्थान</h3>
          <div className="h-64 bg-white rounded-md flex items-center justify-center text-gray-500 border border-gray-300">
            🗺️ Google Map (यहाँ कलुपुरा का गूगल मैप एम्बेड करें)
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ContactPage
"use client";

import { useState, useEffect } from "react";

export default function AddVillage() {
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all villages on mount
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/kalupra/getinfovillage");
        
        if (res.ok) {
          const data = await res.json();
          console.log("info:",data)
          setVillages(data);
        }
      } catch (err) {
        console.error("Failed to fetch villages:", err);
      }
    };
    fetchVillages();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/v1/kalupra/addinfovillage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("गाँव की जानकारी सफलतापूर्वक जोड़ी गई! 🌾");
        setFormData({ imageUrl: "", title: "", description: "" });
        // Refresh list
        const updatedRes = await fetch("http://localhost:5000/api/v1/kalupra/getinfovillage");
        const updatedData = await updatedRes.json();
        setVillages(updatedData);
      } else {
        setMessage(data.message || "गाँव जोड़ने में त्रुटि");
      }
    } catch (error) {
      console.error(error);
      setMessage("सर्वर त्रुटि, कृपया बाद में प्रयास करें");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("क्या आप वाकई इस गाँव की जानकारी हटाना चाहते हैं?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/kalupra/deleteinfovillage/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVillages(villages.filter(v => v._id !== id));
        setMessage("जानकारी हटा दी गई!");
      } else {
        const data = await res.json();
        setMessage(data.message || "हटाने में त्रुटि");
      }
    } catch (err) {
      console.error(err);
      setMessage("हटाने में सर्वर त्रुटि");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      {/* Add Form */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mb-10 border border-amber-200">
        <h1 className="text-2xl font-bold text-center mb-4 text-amber-800">नया गाँव जोड़ें</h1>
        {message && <p className="text-center text-green-600 mb-4 font-medium">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-amber-700 mb-1 font-medium">चित्र URL (केवल):</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-700 mb-1 font-medium">शीर्षक:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-700 mb-1 font-medium">विवरण:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2.5 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-70"
          >
            {loading ? "जोड़ा जा रहा है..." : "जोड़ें 🌾"}
          </button>
        </form>
      </div>

      {/* Village Cards */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-4 text-center">गाँवों की जानकारी</h2>

        {villages.length === 0 ? (
          <div className="text-center text-amber-600 py-6">अभी कोई गाँव नहीं जोड़ा गया।</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villages.map((village) => (
              <div
                key={village._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200 hover:shadow-lg transition-shadow"
              >
                {village.imageUrl && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={village.imageUrl}
                      alt={village.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{village.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{village.description}</p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleDelete(village._id)}
                    className="w-full mt-2 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    हटाएँ ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
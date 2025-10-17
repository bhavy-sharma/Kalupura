"use client";

import { useState, useEffect } from "react";

export default function AddSpecialEvent() {
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    type: "",
    description: "",
    date: "",
    location: "",
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/kalupra/getevent");
        if (res.ok) {
          const data = await res.json();
         
          setEvents(data.events || []);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
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
      const res = await fetch("http://localhost:5000/api/v1/kalupra/addevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("विशेष आयोजन सफलतापूर्वक जोड़ा गया! 🌾");
        setFormData({
          imageUrl: "",
          title: "",
          type: "",
          description: "",
          date: "",
          location: "",
        });
        // Refresh list
        const updatedRes = await fetch("http://localhost:5000/api/v1/kalupra/getevent");
        const updatedData = await updatedRes.json();
        setEvents(updatedData.events || []);
      } else {
        setMessage(data.message || "आयोजन जोड़ने में त्रुटि");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("सर्वर त्रुटि, कृपया बाद में प्रयास करें");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("क्या आप वाकई इस आयोजन को हटाना चाहते हैं?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/kalupra/deleteevent/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents(events.filter(event => event._id !== id));
        setMessage("आयोजन हटा दिया गया!");
      } else {
        const data = await res.json();
        setMessage(data.message || "हटाने में त्रुटि");
      }
    } catch (err) {
      console.error(err);
      setMessage("हटाने में सर्वर त्रुटि");
    }
  };

  // Format date for display (e.g., 18 अक्टूबर, 2025)
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('hi-IN', options);
  };
  console.log(events)

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      {/* Add Form */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mb-10 border border-amber-200">
        <h1 className="text-2xl font-bold text-center mb-4 text-amber-800">नया विशेष आयोजन जोड़ें</h1>
        {message && <p className="text-center text-green-600 mb-4 font-medium">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-amber-700 mb-1 font-medium">चित्र URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/event.jpg"
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
            <label className="block text-amber-700 mb-1 font-medium">प्रकार (जैसे: त्योहार, शादी, मेला):</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-700 mb-1 font-medium">तारीख:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-700 mb-1 font-medium">स्थान:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
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
            {loading ? "जोड़ा जा रहा है..." : "आयोजन जोड़ें 🌾"}
          </button>
        </form>
      </div>

      {/* Events List */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-4 text-center">विशेष आयोजन</h2>

        {events.length === 0 ? (
          <div className="text-center text-amber-600 py-6">अभी कोई आयोजन नहीं जोड़ा गया।</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200 hover:shadow-lg transition-shadow"
              >
                {event.imageUrl && (
                  <div className="h-36 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                  <p className="text-amber-600 text-sm mt-1">प्रकार: {event.type || '—'}</p>
                  <p className="text-gray-600 text-sm mt-1">तारीख: {formatDate(event.date)}</p>
                  <p className="text-gray-600 text-sm mt-1">स्थान: {event.location || '—'}</p>
                  <p className="text-gray-700 text-sm mt-2">{event.description}</p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleDelete(event._id)}
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
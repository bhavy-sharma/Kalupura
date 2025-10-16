'use client';

import React, { useState, useEffect } from 'react';

function AllRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getallusers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const pending = Array.isArray(data)
          ? data.filter(item => item.isEnabled === null || item.isEnabled === undefined)
          : [];
        setRequests(pending);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setMessage('डेटा लोड करने में त्रुटि');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {const res = await fetch(`http://localhost:5000/api/v1/kalupra/updateisEnabled/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnable: true })
      });

      if (res.ok) {
        setMessage('✅ आवेदन स्वीकृत कर दिया गया!');
        setRequests(prev => prev.filter(req => req._id !== id));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ अनुमोदन विफल');
      }
    } catch (err) {
      setMessage('❌ नेटवर्क त्रुटि');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('क्या आप वाकई इस आवेदन को अस्वीकार करना चाहते हैं?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/kalupra/updateisEnabled/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnable: false })
      });

      if (res.ok) {
        setMessage('❌ आवेदन अस्वीकृत कर दिया गया!');
        setRequests(prev => prev.filter(req => req._id !== id));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ अस्वीकृति विफल');
      }
    } catch (err) {
      setMessage('❌ नेटवर्क त्रुटि');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">सभी आवेदन (प्रतीक्षाधीन)</h1>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-center ${
          message.startsWith('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-3 text-gray-600">आवेदन लोड हो रहे हैं...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow text-gray-500">
          कोई प्रतीक्षाधीन आवेदन नहीं है।
        </div>
      ) : (
        <div className="space-y-5">
          {requests.map((req) => (
            <div key={req._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">नाम:</span> {req.name || '—'}</div>
                    <div><span className="font-medium">पिता/पति:</span> {req.headOfFamilyName || '—'}</div>
                    <div><span className="font-medium">जन्म तिथि:</span> {req.dob || '—'} </div>
                    <div><span className="font-medium">मोबाइल:</span> {req.phoneNumber || '—'}</div>
                    <div><span className="font-medium">गाँव:</span> {req.VillageName || 'kalupra'}</div>
                    <div><span className="font-medium">पेशा:</span> {req.occupation || '—'}</div>
                    <div><span className="font-medium">आधार:</span> {req.aadharNumber || '—'}</div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors"
                    title="अनुमोदित करें"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200 transition-colors"
                    title="अस्वीकृत करें"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllRequest;
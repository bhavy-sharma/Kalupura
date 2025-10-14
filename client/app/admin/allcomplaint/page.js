'use client';

import React, { useState, useEffect } from 'react';

function AllComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/addcomplaint');
        if (!res.ok) throw new Error('Failed to fetch complaints');
        const data = await res.json();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setMessage('शिकायतें लोड करने में त्रुटि');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('क्या आप वाकई इस शिकायत को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।')) return;

    try {
      const res = await fetch(`/api/admin/addcomplaint/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('✅ शिकायत सफलतापूर्वक हटा दी गई!');
        setComplaints(prev => prev.filter(comp => comp._id !== id));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ शिकायत हटाने में विफल');
      }
    } catch (err) {
      setMessage('❌ नेटवर्क त्रुटि');
    }
  };

  // Format date to Hindi-friendly
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">सभी शिकायतें</h1>

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
          <p className="mt-3 text-gray-600">शिकायतें लोड हो रही हैं...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow text-gray-500">
          कोई शिकायत दर्ज नहीं है।
        </div>
      ) : (
        <div className="space-y-5">
          {complaints.map((comp) => (
            <div key={comp._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                {/* Left: Complaint Info */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-bold text-gray-800">विषय:</span> {comp.subject || '—'}
                  </div>
                  <div className="text-gray-700 mb-2 whitespace-pre-line">
                    {comp.message || '—'}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>नाम: {comp.name || '—'}</span>
                    <span>मोबाइल: {comp.phone || '—'}</span>
                    <span>दिनांक: {comp.createdAt ? formatDate(comp.createdAt) : '—'}</span>
                  </div>
                </div>

                {/* Right: Delete Button */}
                <div>
                  <button
                    onClick={() => handleDelete(comp._id)}
                    className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200 transition-colors"
                    title="शिकायत हटाएँ"
                  >
                    🗑️
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

export default AllComplaint;
'use client';

import React, { useState, useEffect } from 'react';

function Approve() {
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getallusers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const approved = Array.isArray(data)
          ? data.filter(item => item.isEnable === true)
          : [];
        setApprovedMembers(approved);
      } catch (err) {
        console.error("Error fetching approved members:", err);
        setMessage('डेटा लोड करने में त्रुटि');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoveToRejected = async (id) => {
    if (!confirm('क्या आप वाकई इस सदस्य को "अस्वीकृत" में ले जाना चाहते हैं?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/kalupra/updateisEnabled/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnable: false })
      });

      if (res.ok) {
        setMessage('✅ सदस्य को अस्वीकृत में स्थानांतरित कर दिया गया!');
        setApprovedMembers(prev => prev.filter(member => member._id !== id));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ स्थानांतरण विफल');
      }
    } catch (err) {
      setMessage('❌ नेटवर्क त्रुटि');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">अनुमोदित सदस्य</h1>

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
          <p className="mt-3 text-gray-600">अनुमोदित सदस्य लोड हो रहे हैं...</p>
        </div>
      ) : approvedMembers.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow text-gray-500">
          कोई अनुमोदित सदस्य नहीं है।
        </div>
      ) : (
        <div className="space-y-5">
          {approvedMembers.map((member) => (
            <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                {/* Left: Member Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">नाम:</span> {member.MemberName || '—'}</div>
                    <div><span className="font-medium">प्रमुख:</span> {member.HeadOfFamily || '—'}</div>
                    <div><span className="font-medium">आयु:</span> {member.age || '—'} वर्ष</div>
                    <div><span className="font-medium">मोबाइल:</span> {member.phoneNumber || '—'}</div>
                    <div><span className="font-medium">गाँव:</span> {member.VillageName || '—'}</div>
                    <div><span className="font-medium">पेशा:</span> {member.occupation || '—'}</div>
                    <div><span className="font-medium">आधार:</span> {member.AadhaarNumber || '—'}</div>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div>
                  <button
                    onClick={() => handleMoveToRejected(member._id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center gap-1"
                  >
                    <span>❌</span> अस्वीकृत में ले जाएँ
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

export default Approve;
'use client';

import React, { useState, useEffect, useMemo } from 'react';

function Rejected() {
  const [rejectedMembers, setRejectedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Search filter state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getallusers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const rejected = Array.isArray(data)
          ? data.filter(item => item.isEnabled === false)
          : [];
        setRejectedMembers(rejected);
      } catch (err) {
        console.error("Error fetching rejected members:", err);
        setMessage('डेटा लोड करने में त्रुटि');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter rejected members based on search term
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return rejectedMembers;
    
    const term = searchTerm.toLowerCase();
    return rejectedMembers.filter(member => 
      (member.name?.toLowerCase().includes(term)) ||
      (member.fatherName?.toLowerCase().includes(term)) ||
      (member.headOfFamilyName?.toLowerCase().includes(term)) ||
      (member.phoneNumber?.includes(term)) ||
      (member.VillageName?.toLowerCase().includes(term)) ||
      (member.occupation?.toLowerCase().includes(term)) ||
      (member.aadharNumber?.includes(term)) ||
      (member.panCardNumber?.includes(term)) ||
      (member.email?.toLowerCase().includes(term)) ||
      (member.dob?.includes(term))
    );
  }, [rejectedMembers, searchTerm]);

  const handleMoveToApproved = async (id) => {
    if (!confirm('क्या आप वाकई इस सदस्य को "अनुमोदित" में ले जाना चाहते हैं?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/kalupra/updateisEnabled/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnable: true })
      });

      if (res.ok) {
        setMessage('✅ सदस्य को अनुमोदित में स्थानांतरित कर दिया गया!');
        setRejectedMembers(prev => prev.filter(member => member._id !== id));
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">अस्वीकृत सदस्य</h1>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-center ${
          message.startsWith('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="खोजें: नाम, मोबाइल, आधार, पैन कार्ड, ईमेल, आदि..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-3 text-gray-600">अस्वीकृत सदस्य लोड हो रहे हैं...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow text-gray-500">
          कोई अस्वीकृत सदस्य नहीं है।
        </div>
      ) : (
        <div className="space-y-5">
          {filteredMembers.map((member) => (
            <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                {/* Left: Member Info */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-sm text-gray-700">
                    <div><span className="font-medium">नाम:</span> {member.name || '—'}</div>
                    <div><span className="font-medium">पिता:</span> {member.fatherName || '—'}</div>
                    <div><span className="font-medium">पति/परिवार प्रमुख:</span> {member.headOfFamilyName || '—'}</div>
                    <div><span className="font-medium">जन्म तिथि:</span> {member.dob || '—'}</div>
                    <div><span className="font-medium">मोबाइल:</span> {member.phoneNumber || '—'}</div>
                    <div><span className="font-medium">गाँव:</span> {member.VillageName || 'kalupra'}</div>
                    <div><span className="font-medium">पेशा:</span> {member.occupation || '—'}</div>
                    <div><span className="font-medium">आधार कार्ड:</span> {member.aadharNumber || '—'}</div>
                    <div><span className="font-medium">पैन कार्ड:</span> {member.panCardNumber || '—'}</div>
                    <div><span className="font-medium">ईमेल:</span> {member.email || '—'}</div>
                    <div><span className="font-medium">योग्यता:</span> {member.qualification || '—'}</div>
                    <div><span className="font-medium">धर्म:</span> {member.dharam || '—'}</div>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div>
                  <button
                    onClick={() => handleMoveToApproved(member._id)}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium flex items-center gap-1"
                  >
                    <span>✅</span> अनुमोदित में ले जाएँ
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

export default Rejected;
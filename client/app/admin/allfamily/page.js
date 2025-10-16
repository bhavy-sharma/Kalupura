'use client';

import React, { useState, useEffect } from 'react';

function Allfamily() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getallusers');
        if (!res.ok) throw new Error('Failed to fetch data');
        const result = await res.json();
        
        const approved = Array.isArray(result)
          ? result.filter(item => item.role === "headOFFamily")
          : [];
         
        setData(approved);
      } catch (err) {
        console.error("Error fetching family data:", err);
        setError("डेटा लोड करने में त्रुटि");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date (optional)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hi-IN');
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">सभी परिवार सदस्य</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-3 text-gray-600">डेटा लोड हो रहा है...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
          कोई परिवार सदस्य दर्ज नहीं है।
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">क्रमांक</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">प्रमुख का नाम</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">सदस्य का नाम</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">आयु</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">लिंग</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">मोबाइल</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">आधार</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">पैन</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">गाँव</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">पेशा</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">भूमिका</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((member, index) => (
                <tr key={member._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{member.name || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.memberOfFamily || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.dob || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.gender || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.phoneNumber || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.aadharNumber || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.PencardNumber || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.village || 'kalupra'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.occupation || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.role || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Allfamily;
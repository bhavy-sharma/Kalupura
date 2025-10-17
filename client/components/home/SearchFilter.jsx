'use client';

import { useState, useMemo, useEffect } from 'react';

const SearchFilter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/v1/kalupra/getallusers");
        if (!res.ok) throw new Error("Failed to fetch data");
        const rawData = await res.json();
        
        const dataWithAge = rawData.map(user => ({
          ...user,
          age: calculateAge(user.dob)
        }));
        
        setData(dataWithAge);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("डेटा लोड करने में त्रुटि");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [filters, setFilters] = useState({
    name: '',
    fatherName: '',
    grandfatherName: '',
    phoneNumber: '', 
    minAge: '',
    maxAge: ''
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesName = filters.name
        ? item.name?.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchesFather = filters.fatherName
        ? item.fatherName?.toLowerCase().includes(filters.fatherName.toLowerCase())
        : true;

      const matchesGrandfather = filters.grandfatherName
        ? item.grandfatherName?.toLowerCase().includes(filters.grandfatherName.toLowerCase())
        : true;

      const matchesPhone = filters.phoneNumber
        ? item.phoneNumber?.includes(filters.phoneNumber)
        : true;

      const matchesMinAge = filters.minAge !== ''
        ? item.age !== null && item.age >= parseInt(filters.minAge)
        : true;

      const matchesMaxAge = filters.maxAge !== ''
        ? item.age !== null && item.age <= parseInt(filters.maxAge)
        : true;

      return matchesName && matchesFather && matchesGrandfather && matchesPhone && matchesMinAge && matchesMaxAge;
    });
  }, [filters, data]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      fatherName: '',
      grandfatherName: '',
      phoneNumber: '',
      minAge: '',
      maxAge: ''
    });
  };

  // Split data
  const initialResults = filteredData.slice(0, 10);
  const remainingResults = filteredData.slice(10);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-amber-700 text-lg">डेटा लोड हो रहा है... 🌾</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto bg-amber-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6 text-center">खोज एवं फ़िल्टर परिवार सदस्य</h1>

      {/* 🔍 Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-amber-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="नाम दर्ज करें"
            value={filters.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
          />
          <input
            type="text"
            placeholder="पिता का नाम"
            value={filters.fatherName}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
          />
          <input
            type="text"
            placeholder="दादा का नाम"
            value={filters.grandfatherName}
            onChange={(e) => handleInputChange('grandfatherName', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
          />
          <input
            type="text"
            placeholder="मोबाइल नंबर"
            value={filters.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
          />
          <input
            type="number"
            placeholder="न्यूनतम आयु"
            value={filters.minAge}
            onChange={(e) => handleInputChange('minAge', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
            min="0"
          />
          <input
            type="number"
            placeholder="अधिकतम आयु"
            value={filters.maxAge}
            onChange={(e) => handleInputChange('maxAge', e.target.value)}
            className="px-4 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            फ़िल्टर साफ़ करें
          </button>
        </div>
      </div>

      {/* 📋 Results */}
      <div className="space-y-6">
        {/* Initial 10 Results (Vertical) */}
        {initialResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
            <div className="px-4 md:px-6 py-3 md:py-4 bg-amber-100 font-bold text-amber-800">
              प्रारंभिक परिणाम ({initialResults.length})
            </div>
            <div className="divide-y divide-amber-100">
              {initialResults.map((item) => (
                <div key={item._id} className="px-4 md:px-6 py-4 hover:bg-amber-50 transition">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 mt-1">पिता: {item.fatherName || '—'}</p>
                      <p className="text-gray-600">दादा: {item.grandfatherName || '—'}</p>
                    </div>
                    <div className="text-right text-gray-700 min-w-[120px]">
                      <p>आयु: {item.age !== null ? `${item.age} वर्ष` : '—'}</p>
                      <p className="mt-1">मोबाइल: {item.phoneNumber || '—'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Remaining Results (Horizontal Scroll) */}
        {remainingResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-200">
            <div className="font-bold text-amber-800 mb-3">अतिरिक्त परिणाम ({remainingResults.length})</div>
            <div className="flex overflow-x-auto pb-2 space-x-4 hide-scrollbar">
              {remainingResults.map((item) => (
                <div
                  key={item._id}
                  className="flex-shrink-0 w-64 bg-amber-50 rounded-lg p-4 border border-amber-200 hover:bg-amber-100 transition"
                >
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">पिता: {item.fatherName || '—'}</p>
                  <p className="text-sm text-gray-600">दादा: {item.grandfatherName || '—'}</p>
                  <p className="text-sm text-gray-700 mt-2">आयु: {item.age !== null ? `${item.age} वर्ष` : '—'}</p>
                  <p className="text-sm text-gray-700">मोबाइल: {item.phoneNumber || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center border border-amber-200">
            <div className="text-amber-700">कोई डेटा नहीं मिला। कृपया अन्य खोज पद दर्ज करें। 🌾</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
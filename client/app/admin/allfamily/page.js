'use client';

import React, { useState, useEffect, useMemo } from 'react';

function Allfamily() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    grandfatherName: '',
    grandmotherName: '',
    dob: '',
    dobTime: '',
    qualification: '',
    gender: '',
    phoneNumber: '',
    age: '',
    occupation: '',
    maritalStatus: '',
    marriageDate: '',
    dharam: '',
    jaati: '',
    hasVehicle: '',
    vehicleCount: '',
    aadharNumber: '',
    panCardNumber: '',
    headOfFamilyName: '',
    email: '',
    role: '',
    roomId: '',
    isEnabled: '',
    vehicleType: '',
    vehicleNumberPlate: '',
    vehiclePurchaseDate: '',
    vehicleInsuranceExpiry: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getallusers');
        if (!res.ok) throw new Error('Failed to fetch data');
        const result = await res.json();

        // Ensure it's an array
        const users = Array.isArray(result) ? result : [];
        setData(users);
      } catch (err) {
        console.error("Error fetching family ", err);
        setError("डेटा लोड करने में त्रुटि");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data with search across all fields
  const filteredData = useMemo(() => {
    return data.filter(user => {
      // Check all user fields
      const matchesName = filters.name
        ? (user.name?.toLowerCase().includes(filters.name.toLowerCase()) || '')
        : true;

      const matchesFatherName = filters.fatherName
        ? (user.fatherName?.toLowerCase().includes(filters.fatherName.toLowerCase()) || '')
        : true;

      const matchesMotherName = filters.motherName
        ? (user.motherName?.toLowerCase().includes(filters.motherName.toLowerCase()) || '')
        : true;

      const matchesGrandfatherName = filters.grandfatherName
        ? (user.grandfatherName?.toLowerCase().includes(filters.grandfatherName.toLowerCase()) || '')
        : true;

      const matchesGrandmotherName = filters.grandmotherName
        ? (user.grandmotherName?.toLowerCase().includes(filters.grandmotherName.toLowerCase()) || '')
        : true;

      const matchesDob = filters.dob
        ? (user.dob?.toLowerCase().includes(filters.dob.toLowerCase()) || '')
        : true;

      const matchesDobTime = filters.dobTime
        ? (user.dobTime?.toLowerCase().includes(filters.dobTime.toLowerCase()) || '')
        : true;

      const matchesQualification = filters.qualification
        ? (user.qualification?.toLowerCase().includes(filters.qualification.toLowerCase()) || '')
        : true;

      const matchesGender = filters.gender
        ? user.gender === filters.gender
        : true;

      const matchesPhoneNumber = filters.phoneNumber
        ? (user.phoneNumber?.includes(filters.phoneNumber) || '')
        : true;

      const matchesAge = filters.age
        ? user.age?.toString().includes(filters.age)
        : true;

      const matchesOccupation = filters.occupation
        ? (user.occupation?.toLowerCase().includes(filters.occupation.toLowerCase()) || '')
        : true;

      const matchesMaritalStatus = filters.maritalStatus
        ? user.maritalStatus === filters.maritalStatus
        : true;

      const matchesMarriageDate = filters.marriageDate
        ? (user.marriageDate?.toLowerCase().includes(filters.marriageDate.toLowerCase()) || '')
        : true;

      const matchesDharam = filters.dharam
        ? (user.dharam?.toLowerCase().includes(filters.dharam.toLowerCase()) || '')
        : true;

      const matchesJaati = filters.jaati
        ? (user.jaati?.toLowerCase().includes(filters.jaati.toLowerCase()) || '')
        : true;

      const matchesHasVehicle = filters.hasVehicle
        ? user.hasVehicle?.toString() === filters.hasVehicle
        : true;

      const matchesVehicleCount = filters.vehicleCount
        ? user.vehicleCount?.toString().includes(filters.vehicleCount)
        : true;

      const matchesAadharNumber = filters.aadharNumber
        ? (user.aadharNumber?.includes(filters.aadharNumber) || '')
        : true;

      const matchesPanCardNumber = filters.panCardNumber
        ? (user.panCardNumber?.includes(filters.panCardNumber) || '')
        : true;

      const matchesHeadOfFamilyName = filters.headOfFamilyName
        ? (user.headOfFamilyName?.toLowerCase().includes(filters.headOfFamilyName.toLowerCase()) || '')
        : true;

      const matchesEmail = filters.email
        ? (user.email?.toLowerCase().includes(filters.email.toLowerCase()) || '')
        : true;

      const matchesRole = filters.role
        ? user.role === filters.role
        : true;

      const matchesRoomId = filters.roomId
        ? (user.roomId?.toLowerCase().includes(filters.roomId.toLowerCase()) || '')
        : true;

      const matchesIsEnabled = filters.isEnabled
        ? user.isEnabled?.toString() === filters.isEnabled
        : true;

      // Check vehicle fields
      let matchesVehicleFields = true;
      if (filters.vehicleType || filters.vehicleNumberPlate || filters.vehiclePurchaseDate || filters.vehicleInsuranceExpiry) {
        matchesVehicleFields = user.vehicles?.some(vehicle => {
          const matchesVType = filters.vehicleType
            ? (vehicle.type?.toLowerCase().includes(filters.vehicleType.toLowerCase()) || '')
            : true;

          const matchesVNumberPlate = filters.vehicleNumberPlate
            ? (vehicle.numberPlate?.includes(filters.vehicleNumberPlate) || '')
            : true;

          const matchesVPurchaseDate = filters.vehiclePurchaseDate
            ? (vehicle.purchaseDate?.toLowerCase().includes(filters.vehiclePurchaseDate.toLowerCase()) || '')
            : true;

          const matchesVInsuranceExpiry = filters.vehicleInsuranceExpiry
            ? (vehicle.insuranceExpiry?.toLowerCase().includes(filters.vehicleInsuranceExpiry.toLowerCase()) || '')
            : true;

          return matchesVType && matchesVNumberPlate && matchesVPurchaseDate && matchesVInsuranceExpiry;
        }) || false;
      }

      return matchesName && matchesFatherName && matchesMotherName && matchesGrandfatherName &&
        matchesGrandmotherName && matchesDob && matchesDobTime && matchesQualification &&
        matchesGender && matchesPhoneNumber && matchesAge && matchesOccupation &&
        matchesMaritalStatus && matchesMarriageDate && matchesDharam && matchesJaati &&
        matchesHasVehicle && matchesVehicleCount && matchesAadharNumber && matchesPanCardNumber &&
        matchesHeadOfFamilyName && matchesEmail && matchesRole && matchesRoomId &&
        matchesIsEnabled && matchesVehicleFields;
    });
  }, [filters, data]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      fatherName: '',
      motherName: '',
      grandfatherName: '',
      grandmotherName: '',
      dob: '',
      dobTime: '',
      qualification: '',
      gender: '',
      phoneNumber: '',
      age: '',
      occupation: '',
      maritalStatus: '',
      marriageDate: '',
      dharam: '',
      jaati: '',
      hasVehicle: '',
      vehicleCount: '',
      aadharNumber: '',
      panCardNumber: '',
      headOfFamilyName: '',
      email: '',
      role: '',
      roomId: '',
      isEnabled: '',
      vehicleType: '',
      vehicleNumberPlate: '',
      vehiclePurchaseDate: '',
      vehicleInsuranceExpiry: '',
    });
  };

  // Format vehicles for display
  // Format vehicles for display
  const formatVehicles = (vehicles) => {
    if (!vehicles || vehicles.length === 0) return '—';

    return vehicles.map((v, idx) => (
      <div key={idx} className="text-xs space-y-1">
        <div className="font-medium">वाहन {idx + 1}:</div>
        <div className="ml-4">
          <div>प्रकार: {v.type || '—'}</div>
          <div>नंबर प्लेट: {v.numberPlate || '—'}</div>
          <div>खरीद तिथि: {v.purchaseDate || '—'}</div>
          <div>बीमा समाप्ति: {v.insuranceExpiry || '—'}</div>
        </div>
      </div>
    ));
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
          <p className="mt-3 text-amber-700">डेटा लोड हो रहा है... 🌾</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-amber-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6 text-center">सभी परिवार सदस्य</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {/* 🔍 Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-amber-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="नाम"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="पिता का नाम"
            value={filters.fatherName}
            onChange={(e) => handleFilterChange('fatherName', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="माता का नाम"
            value={filters.motherName}
            onChange={(e) => handleFilterChange('motherName', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="दादा का नाम"
            value={filters.grandfatherName}
            onChange={(e) => handleFilterChange('grandfatherName', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="दादी का नाम"
            value={filters.grandmotherName}
            onChange={(e) => handleFilterChange('grandmotherName', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="जन्म तिथि"
            value={filters.dob}
            onChange={(e) => handleFilterChange('dob', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="जन्म समय"
            value={filters.dobTime}
            onChange={(e) => handleFilterChange('dobTime', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="योग्यता"
            value={filters.qualification}
            onChange={(e) => handleFilterChange('qualification', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 text-sm"
          >
            <option value="">सभी लिंग</option>
            <option value="male">पुरुष</option>
            <option value="female">महिला</option>
            <option value="other">अन्य</option>
          </select>
          <input
            type="text"
            placeholder="मोबाइल नंबर"
            value={filters.phoneNumber}
            onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="आयु"
            value={filters.age}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="व्यवसाय"
            value={filters.occupation}
            onChange={(e) => handleFilterChange('occupation', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <select
            value={filters.maritalStatus}
            onChange={(e) => handleFilterChange('maritalStatus', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 text-sm"
          >
            <option value="">सभी वैवाहिक स्थिति</option>
            <option value="single">अविवाहित</option>
            <option value="married">विवाहित</option>
            <option value="divorced">तलाकशुदा</option>
            <option value="widowed">विधवा/विधुर</option>
          </select>
          <input
            type="text"
            placeholder="विवाह तिथि"
            value={filters.marriageDate}
            onChange={(e) => handleFilterChange('marriageDate', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="धर्म"
            value={filters.dharam}
            onChange={(e) => handleFilterChange('dharam', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="जाति"
            value={filters.jaati}
            onChange={(e) => handleFilterChange('jaati', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <select
            value={filters.hasVehicle}
            onChange={(e) => handleFilterChange('hasVehicle', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 text-sm"
          >
            <option value="">वाहन स्थिति</option>
            <option value="true">हाँ</option>
            <option value="false">नहीं</option>
          </select>
          <input
            type="text"
            placeholder="वाहन संख्या"
            value={filters.vehicleCount}
            onChange={(e) => handleFilterChange('vehicleCount', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="आधार नंबर"
            value={filters.aadharNumber}
            onChange={(e) => handleFilterChange('aadharNumber', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="पैन कार्ड नंबर"
            value={filters.panCardNumber}
            onChange={(e) => handleFilterChange('panCardNumber', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="परिवार प्रमुख"
            value={filters.headOfFamilyName}
            onChange={(e) => handleFilterChange('headOfFamilyName', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="ईमेल"
            value={filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 text-sm"
          >
            <option value="">सभी भूमिकाएँ</option>
            <option value="admin">एडमिन</option>
            <option value="headOFFamily">परिवार प्रमुख</option>
            <option value="member">सदस्य</option>
          </select>
          <input
            type="text"
            placeholder="गाँव (Room ID)"
            value={filters.roomId}
            onChange={(e) => handleFilterChange('roomId', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <select
            value={filters.isEnabled}
            onChange={(e) => handleFilterChange('isEnabled', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 text-sm"
          >
            <option value="">सक्रिय स्थिति</option>
            <option value="true">सक्रिय</option>
            <option value="false">निष्क्रिय</option>
          </select>
          <input
            type="text"
            placeholder="वाहन प्रकार"
            value={filters.vehicleType}
            onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="वाहन नंबर प्लेट"
            value={filters.vehicleNumberPlate}
            onChange={(e) => handleFilterChange('vehicleNumberPlate', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="वाहन खरीद तिथि"
            value={filters.vehiclePurchaseDate}
            onChange={(e) => handleFilterChange('vehiclePurchaseDate', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
          <input
            type="text"
            placeholder="वाहन बीमा समाप्ति"
            value={filters.vehicleInsuranceExpiry}
            onChange={(e) => handleFilterChange('vehicleInsuranceExpiry', e.target.value)}
            className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 text-amber-900 text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm"
          >
            फ़िल्टर साफ़ करें
          </button>
        </div>
      </div>

      {/* 📋 Table */}
      {filteredData.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow text-amber-700">
          कोई डेटा नहीं मिला।
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-amber-200">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-amber-100">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">क्रमांक</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">नाम</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">पिता</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">माता</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">दादा</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">दादी</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">जन्म तिथि</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">जन्म समय</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">योग्यता</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">लिंग</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">मोबाइल</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">आयु</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">व्यवसाय</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">वैवाहिक स्थिति</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">विवाह तिथि</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">धर्म</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">जाति</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">वाहन</th>
                {/* <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">वाहन संख्या</th> */}
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">आधार</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">पैन कार्ड</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">परिवार प्रमुख</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">ईमेल</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">भूमिका</th>
                {/* <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">गाँव</th> */}
                {/* <th className="px-3 py-2 text-left text-xs font-medium text-amber-800 uppercase tracking-wider whitespace-nowrap">सक्रिय</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-100">
              {filteredData.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-amber-50">
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{index + 1}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.name || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.fatherName || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.motherName || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.grandfatherName || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.grandmotherName || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.dob || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.dobTime || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.qualification || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {user.gender === 'male' ? 'पुरुष' : user.gender === 'female' ? 'महिला' : 'अन्य'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.phoneNumber || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.age || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.occupation || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {user.maritalStatus === 'married' ? 'विवाहित' :
                      user.maritalStatus === 'single' ? 'अविवाहित' :
                        user.maritalStatus === 'divorced' ? 'तलाकशुदा' : 'विधवा/विधुर'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.marriageDate || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.dharam || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.jaati || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 w-64 min-w-[16rem]">
                    <div className="space-y-1">{formatVehicles(user.vehicles)}</div>
                  </td>
                  {/* <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.vehicleCount || '—'}</td> */}
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.aadharNumber || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.panCardNumber || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.headOfFamilyName || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.email || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {user.role === 'admin' ? 'एडमिन' : user.role === 'headOFFamily' ? 'प्रमुख' : 'सदस्य'}
                  </td>
                  {/* <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{user.roomId || 'kalupra'}</td> */}
                  {/* <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {user.isEnabled === true ? 'हाँ' : user.isEnabled === false ? 'नहीं' : '—'}
                  </td> */}
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
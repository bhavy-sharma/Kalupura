'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    // Personal & Family Info
    name: '',
    fatherName: '',
    motherName: '',
    grandfatherName: '',
    grandmotherName: '',
    dob: '',
    age: '', // ✅ Auto-calculated age
    dobTime: '',
    gender: '',
    phoneNumber: '',
    aadharNumber: '',
    panCardNumber: '',
    
    // Education & Work
    qualification: '',
    occupation: '',
    
    // Marital & Social
    maritalStatus: 'single',
    marriageDate: '',
    dharam: '',
    jaati: '',
    
    // Vehicles
    hasVehicle: false,
    vehicleCount: 1,
    vehicles: [{ type: '', numberPlate: '', purchaseDate: '', insuranceExpiry: '' }],
    
    // Auth
    headOfFamilyName: '',
    email: '',
    password: '',
    role: 'headOFFamily',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  // ✅ Enhanced handleChange with auto age calculation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    // Auto-calculate age when DOB changes
    if (name === 'dob' && value) {
      const dob = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        calculatedAge--;
      }
      updatedData.age = calculatedAge > 0 ? calculatedAge : '';
    }

    setFormData(updatedData);
  };

  const handleVehicleCountChange = (count) => {
    setFormData((prev) => {
      const newVehicles = Array.from({ length: count }, (_, i) => 
        prev.vehicles[i] || { type: '', numberPlate: '', purchaseDate: '', insuranceExpiry: '' }
      );
      return { ...prev, vehicleCount: count, vehicles: newVehicles };
    });
  };

  const handleVehicleFieldChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.vehicles];
      updated[index][field] = value;
      return { ...prev, vehicles: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.fatherName || !formData.dob || !formData.email || !formData.password) {
      setError('सभी आवश्यक फ़ील्ड भरें।');
      return;
    }

    if (!formData.phoneNumber || !/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      setError('मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।');
      return;
    }

    if (!formData.gender) {
      setError('लिंग चुनें।');
      return;
    }

    if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
      setError('आधार नंबर 12 अंकों का होना चाहिए।');
      return;
    }

    if (formData.panCardNumber && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panCardNumber)) {
      setError('PAN कार्ड नंबर वैध प्रारूप में नहीं है।');
      return;
    }

    if (formData.maritalStatus === 'married' && !formData.marriageDate) {
      setError('विवाह तिथि आवश्यक है।');
      return;
    }

    if (!formData.dharam) {
      setError('धर्म चुनें।');
      return;
    }

    if (!formData.jaati) {
      setError('जाति श्रेणी चुनें।');
      return;
    }

    if (formData.hasVehicle) {
      for (let i = 0; i < formData.vehicleCount; i++) {
        if (!formData.vehicles[i].type || !formData.vehicles[i].numberPlate) {
          setError(`वाहन ${i + 1}: प्रकार और नंबर प्लेट आवश्यक है।`);
          return;
        }
      }
    }

    try {
      const payload = {
        name: formData.name,
        fatherName: formData.fatherName,
        motherName: formData.motherName || null,
        grandfatherName: formData.grandfatherName,
        grandmotherName: formData.grandmotherName || null,
        dob: formData.dob,
        dobTime: formData.dobTime || null,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        aadharNumber: formData.aadharNumber || null,
        panCardNumber: formData.panCardNumber || null,
        qualification: formData.qualification || null,
        occupation: formData.occupation || null,
        maritalStatus: formData.maritalStatus,
        marriageDate: formData.maritalStatus === 'married' ? formData.marriageDate : null,
        dharam: formData.dharam,
        jaati: formData.jaati,
        vehicles: formData.hasVehicle ? formData.vehicles.map(v => ({
          type: v.type,
          numberPlate: v.numberPlate,
          purchaseDate: v.purchaseDate || null,
          insuranceExpiry: v.insuranceExpiry || null,
        })) : [],
        headOfFamilyName: formData.headOfFamilyName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const res = await fetch('http://localhost:5000/api/v1/kalupra/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.message || 'पंजीकरण विफल। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      setError('कुछ गड़बड़ हुई। कृपया अपना कनेक्शन जाँचें।');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-amber-200">
        {/* Village Style Header */}
        <div className="text-center mb-6 border-b-2 border-amber-300 pb-4">
          <div className="flex justify-center items-center mb-2">
            <span className="text-4xl mr-2">🌾</span>
            <h1 className="text-3xl font-bold text-amber-800">गाँव कलुपुरा</h1>
            <span className="text-4xl ml-2">🚜</span>
          </div>
          <p className="text-gray-600 mt-2 text-lg">नया परिवार पंजीकरण फॉर्म</p>
          <p className="text-amber-600 text-sm mt-1">कृपया सभी विवरण सही sequence में भरें</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal & Family Information */}
          <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
              <h2 className="text-xl font-semibold text-amber-800">परिवार की जानकारी</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">सदस्य का नाम *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="आपका पूरा नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fatherName" className="block text-gray-700 mb-2 font-medium">पिता का नाम *</label>
                  <input
                    id="fatherName"
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="पिता का पूरा नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="motherName" className="block text-gray-700 mb-2 font-medium">माता का नाम</label>
                  <input
                    id="motherName"
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="माता का पूरा नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="grandfatherName" className="block text-gray-700 mb-2 font-medium">दादा का नाम *</label>
                  <input
                    id="grandfatherName"
                    type="text"
                    name="grandfatherName"
                    value={formData.grandfatherName}
                    onChange={handleChange}
                    placeholder="दादा का पूरा नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="grandmotherName" className="block text-gray-700 mb-2 font-medium">दादी का नाम</label>
                  <input
                    id="grandmotherName"
                    type="text"
                    name="grandmotherName"
                    value={formData.grandmotherName}
                    onChange={handleChange}
                    placeholder="दादी का पूरा नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-gray-700 mb-1">जन्म तिथि *</label>
                  <input 
                    id="dob"
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                    required 
                  />
                </div>
              </div>

              {/* ✅ NEW: Age Field (Auto-calculated) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div></div> {/* Spacer */}
                <div>
                  <label htmlFor="age" className="block text-gray-700 mb-1">आयु (स्वचालित)</label>
                  <input 
                    id="age"
                    type="text" 
                    value={formData.age ? `${formData.age} वर्ष` : ''}
                    readOnly
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg bg-amber-100 text-amber-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dobTime" className="block text-gray-700 mb-1">जन्म समय (वैकल्पिक)</label>
                  <input 
                    id="dobTime"
                    type="time" 
                    name="dobTime" 
                    value={formData.dobTime} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label htmlFor="headOfFamilyName" className="block text-gray-700 mb-2 font-medium">परिवार प्रमुख का नाम *</label>
                  <input
                    id="headOfFamilyName"
                    type="text"
                    name="headOfFamilyName"
                    value={formData.headOfFamilyName}
                    onChange={handleChange}
                    placeholder="परिवार मुखिया का नाम"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                  />
                </div>
              </div>

              {/* New Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-gray-700 mb-2 font-medium">लिंग *</label>
                  <select 
                    id="gender"
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="">चुनें</option>
                    <option value="male">पुरुष</option>
                    <option value="female">महिला</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 mb-2 font-medium">मोबाइल नंबर *</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="aadharNumber" className="block text-gray-700 mb-2 font-medium">आधार नंबर (12 अंक)</label>
                  <input
                    id="aadharNumber"
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    placeholder="123456789012"
                    maxLength="12"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="panCardNumber" className="block text-gray-700 mb-2 font-medium">PAN कार्ड नंबर</label>
                  <input
                    id="panCardNumber"
                    type="text"
                    name="panCardNumber"
                    value={formData.panCardNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength="10"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Education & Work */}
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📚</span>
              <h2 className="text-xl font-semibold text-green-800">शिक्षा एवं रोजगार</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="qualification" className="block text-gray-700 mb-2 font-medium">शैक्षणिक योग्यता</label>
                <input
                  id="qualification"
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="10वीं, 12वीं, स्नातक, आदि"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-gray-700 mb-2 font-medium">व्यवसाय/पेशा</label>
                <input
                  id="occupation"
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="किसान, शिक्षक, मजदूर, व्यवसाय"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Marital & Social Information */}
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">💑</span>
              <h2 className="text-xl font-semibold text-blue-800">वैवाहिक एवं सामाजिक जानकारी</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="maritalStatus" className="block text-gray-700 mb-2 font-medium">वैवाहिक स्थिति *</label>
                  <select 
                    id="maritalStatus"
                    name="maritalStatus" 
                    value={formData.maritalStatus} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="single">अविवाहित</option>
                    <option value="married">विवाहित</option>
                    <option value="divorced">तलाकशुदा</option>
                    <option value="widowed">विधवा/विधुर</option>
                  </select>
                </div>

                {formData.maritalStatus === 'married' && (
                  <div>
                    <label htmlFor="marriageDate" className="block text-gray-700 mb-1">विवाह तिथि *</label>
                    <input 
                      id="marriageDate"
                      type="date" 
                      name="marriageDate" 
                      value={formData.marriageDate} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dharam" className="block text-gray-700 mb-2 font-medium">धर्म *</label>
                  <select 
                    id="dharam"
                    name="dharam" 
                    value={formData.dharam} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">धर्म चुनें</option>
                    <option value="hindu">हिंदू</option>
                    <option value="muslim">मुस्लिम</option>
                    <option value="sikh">सिख</option>
                    <option value="christian">ईसाई</option>
                    <option value="buddhist">बौद्ध</option>
                    <option value="jain">जैन</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="jaati" className="block text-gray-700 mb-2 font-medium">जाति श्रेणी *</label>
                  <select 
                    id="jaati"
                    name="jaati" 
                    value={formData.jaati} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">जाति चुनें</option>
                    <option value="general">सामान्य</option>
                    <option value="obc">ओबीसी</option>
                    <option value="sc">अनुसूचित जाति (SC)</option>
                    <option value="st">अनुसूचित जनजाति (ST)</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Vehicle Information */}
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🚗</span>
              <h2 className="text-xl font-semibold text-red-800">वाहन जानकारी</h2>
            </div>
            <div className="space-y-4">
              <label htmlFor="hasVehicle" className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg border border-red-200">
                <input 
                  id="hasVehicle"
                  type="checkbox" 
                  name="hasVehicle" 
                  checked={formData.hasVehicle} 
                  onChange={(e) => setFormData(prev => ({ ...prev, hasVehicle: e.target.checked }))} 
                  className="w-5 h-5 text-red-600"
                />
                <span className="text-gray-700 font-medium">क्या आपके पास वाहन है?</span>
              </label>

              {formData.hasVehicle && (
                <>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <label htmlFor="vehicleCount" className="block text-gray-700 mb-2 font-medium">वाहनों की संख्या चुनें (1-10)</label>
                    <select
                      id="vehicleCount"
                      value={formData.vehicleCount}
                      onChange={(e) => handleVehicleCountChange(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} वाहन</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    {formData.vehicles.slice(0, formData.vehicleCount).map((vehicle, index) => (
                      <div key={index} className="p-4 bg-white border-2 border-red-200 rounded-lg">
                        <div className="flex items-center mb-3">
                          <span className="text-xl mr-2">🚙</span>
                          <h3 className="font-semibold text-gray-800 text-lg">वाहन {index + 1} की जानकारी</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`vehicle-${index}-type`} className="block text-gray-700 mb-2 font-medium">वाहन प्रकार *</label>
                            <input
                              id={`vehicle-${index}-type`}
                              type="text"
                              value={vehicle.type}
                              onChange={(e) => handleVehicleFieldChange(index, 'type', e.target.value)}
                              placeholder="कार, बाइक, ट्रैक्टर, स्कूटर"
                              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                            />
                          </div>
                          <div>
                            <label htmlFor={`vehicle-${index}-numberPlate`} className="block text-gray-700 mb-2 font-medium">नंबर प्लेट *</label>
                            <input
                              id={`vehicle-${index}-numberPlate`}
                              type="text"
                              value={vehicle.numberPlate}
                              onChange={(e) => handleVehicleFieldChange(index, 'numberPlate', e.target.value)}
                              placeholder="UP12AB1234"
                              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                            />
                          </div>
                          <div>
                            <label htmlFor={`vehicle-${index}-purchaseDate`} className="block text-gray-700 mb-1">खरीद तिथि (वैकल्पिक)</label>
                            <input
                              id={`vehicle-${index}-purchaseDate`}
                              type="date"
                              value={vehicle.purchaseDate}
                              onChange={(e) => handleVehicleFieldChange(index, 'purchaseDate', e.target.value)}
                              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor={`vehicle-${index}-insuranceExpiry`} className="block text-gray-700 mb-1">बीमा समाप्ति तिथि (वैकल्पिक)</label>
                            <input
                              id={`vehicle-${index}-insuranceExpiry`}
                              type="date"
                              value={vehicle.insuranceExpiry}
                              onChange={(e) => handleVehicleFieldChange(index, 'insuranceExpiry', e.target.value)}
                              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 5: Login Information */}
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔐</span>
              <h2 className="text-xl font-semibold text-purple-800">लॉगिन जानकारी</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">ईमेल पता *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gaon.com"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">पासवर्ड *</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="कम से कम 6 अक्षर"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                  minLength="6"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full max-w-md bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 mt-4 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span className="mr-2">🌾</span>
              पंजीकरण पूर्ण करें
              <span className="ml-2">✅</span>
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center border-t border-amber-200 pt-6">
          <p className="text-gray-600">
            पहले से पंजीकृत हैं?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-semibold text-lg">
              यहाँ लॉगिन करें 👉
            </a>
          </p>
        </div>

        <div className="mt-6 text-center text-amber-700 text-sm">
          <p>🌾 गाँव कलुपुरा - जहाँ हर परिवार एक परिवार है 🌾</p>
        </div>
      </div>
    </div>
  );
}
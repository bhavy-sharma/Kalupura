'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',  
    qualification: '',
    occupation: '',
    maritalStatus: 'single', // 'single', 'married', 'divorced', 'widowed'
    fatherName: '',
    grandfatherName: '',
    hasVehicle: false,
    vehicleType: '',
    vehicleNumber: '',
    aadharCard: '',
    panCard: '',
    headOfFamily: 'self', // 'self' or 'family'
    headOfFamilyName: '', // only if headOfFamily === 'family'
    password: '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.aadharCard || formData.aadharCard.length !== 12) {
      setError('Valid 12-digit Aadhar number is required.');
      return;
    }
    if (formData.phone && (formData.phone.length !== 10 || isNaN(formData.phone))) {
      setError('Valid 10-digit phone number is required.');
      return;
    }
    if (!formData.dob) {
      setError('Date of Birth is required.');
      return;
    }
    if (formData.headOfFamily === 'family' && !formData.headOfFamilyName.trim()) {
      setError('Please enter the name of the head of your family.');
      return;
    }
    if (formData.hasVehicle) {
      if (!formData.vehicleType.trim()) {
        setError('Please enter your vehicle type (e.g., Bike, Car, Tractor).');
        return;
      }
      if (!formData.vehicleNumber.trim()) {
        setError('Vehicle number plate is required.');
        return;
      }
    }

    try {
      const payload = {
        name: formData.name,
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        qualification: formData.qualification,
        occupation: formData.occupation,
        maritalStatus: formData.maritalStatus,
        fatherName: formData.fatherName,
        grandfatherName: formData.grandfatherName,
        hasVehicle: formData.hasVehicle,
        vehicleType: formData.hasVehicle ? formData.vehicleType : null,
        vehicleNumber: formData.hasVehicle ? formData.vehicleNumber : null,
        aadharCard: formData.aadharCard,
        panCard: formData.panCard || undefined,
        headOfFamily: formData.headOfFamily,
        headOfFamilyName: formData.headOfFamily === 'family' ? formData.headOfFamilyName : null,
        password: formData.password,
      };

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Gaon Ka Registration Form 🌾</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Phone Number (10 digits) *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Education & Work */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g., 10th Pass, Graduate, etc."
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g., Farmer, Teacher, Labourer"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700">Marital Status *</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {/* Family Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Grandfather's Name *</label>
              <input
                type="text"
                name="grandfatherName"
                value={formData.grandfatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Vehicle Section */}
          <div className="border p-4 rounded">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasVehicle"
                checked={formData.hasVehicle}
                onChange={handleChange}
              />
              <span>Do you own a vehicle?</span>
            </label>

            {formData.hasVehicle && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-gray-700">Vehicle Type (e.g., Bike, Car, Tractor)</label>
                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="e.g., Hero Splendor, Mahindra Bolero"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Vehicle Number Plate</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="e.g., UP12AB1234"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Govt IDs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Aadhar Card Number (12 digits) *</label>
              <input
                type="text"
                name="aadharCard"
                value={formData.aadharCard}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">PAN Card (Optional)</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Head of Family */}
          <div className="border p-4 rounded">
            <label className="block text-gray-700 mb-2">Who is the Head of Your Family? *</label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="headOfFamily"
                  value="self"
                  checked={formData.headOfFamily === 'self'}
                  onChange={handleChange}
                />
                <span className="ml-2">Self</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="headOfFamily"
                  value="family"
                  checked={formData.headOfFamily === 'family'}
                  onChange={handleChange}
                />
                <span className="ml-2">Family Member</span>
              </label>
            </div>

            {formData.headOfFamily === 'family' && (
              <div className="mt-3">
                <label className="block text-gray-700">Name of Head of Family *</label>
                <input
                  type="text"
                  name="headOfFamilyName"
                  value={formData.headOfFamilyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter full name"
                />
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
              minLength="6"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 mt-4 font-medium"
          >
            Complete Registration
          </button>
        </form>

        <p className="mt-4 text-center">
          Already registered?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
'use client';

import { useState, useMemo, useEffect } from 'react';

// 🔹 Replace this with your actual data (from API or props)
// const initialData = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     fatherName: "Somesh Sharma",
//     grandfatherName: "Ramlal Sharma",
//     age: 28,
//     phone: "9876543210"
//   },
//   {
//     id: 2,
//     name: "Priya Devi",
//     fatherName: "Rajesh kumar",
//     grandfatherName: "Mohan laal",
//     age: 24,
//     phone: "8765432109"
//   },
//   {
//     id: 3,
//     name: "Amit Singh",
//     fatherName: "Vijay Singh",
//     grandfatherName: "Gopal Singh",
//     age: 32,
//     phone: "7654321098"
//   }
// ];

const SearchFilter = () => {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await fetch("http://localhost:5000/api/v1/kalupra/getallusers");
      const datas= await res.json();
      setData(datas);
      console.log("data:search", datas)

     
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])

  const [filters, setFilters] = useState({
    name: '',
    fatherName: '',
    grandfatherName: '',
    phone: '',
    minAge: '',
    maxAge: ''
  });

  // 🔹 Filter logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesName = filters.name
        ? item.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchesFather = filters.fatherName
        ? item.fatherName.toLowerCase().includes(filters.fatherName.toLowerCase())
        : true;

      const matchesGrandfather = filters.grandfatherName
        ? item.grandfatherName.toLowerCase().includes(filters.grandfatherName.toLowerCase())
        : true;

      const matchesPhone = filters.phone
        ? item.phone.includes(filters.phone)
        : true;

      const matchesMinAge = filters.minAge !== ''
        ? item.age >= parseInt(filters.minAge) || false
        : true;

      const matchesMaxAge = filters.maxAge !== ''
        ? item.age <= parseInt(filters.maxAge) || false
        : true;

      return matchesName && matchesFather && matchesGrandfather && matchesPhone && matchesMinAge && matchesMaxAge;
    });
  }, [filters]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      fatherName: '',
      grandfatherName: '',
      phone: '',
      minAge: '',
      maxAge: ''
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">खोज एवं फ़िल्टर</h1>

      {/* 🔍 Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Name : "
            value={filters.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Father Name"
            value={filters.fatherName}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter GrandFather Name"
            value={filters.grandfatherName}
            onChange={(e) => handleInputChange('grandfatherName', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={filters.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Minimum Age"
            value={filters.minAge}
            onChange={(e) => handleInputChange('minAge', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <input
            type="number"
            placeholder="Maximum Age"
            value={filters.maxAge}
            onChange={(e) => handleInputChange('maxAge', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* 📋 Results */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 font-semibold text-gray-700">
          Result ({filteredData.length})
        </div>
        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            There is no data Found here, Search Something else.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredData.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Father: {item.fatherName}</p>
                    <p className="text-gray-600">GrandFather: {item.grandfatherName}</p>
                  </div>
                  <div className="text-right text-gray-700">
                    <p>Age: {item.age} वर्ष</p>
                    <p>Phone: {item.phoneNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { set } from 'mongoose';

const AdminDashboard = () => {
  const [activeTab] = useState('dashboard');
  const [complaints, setComplaints] = useState(null);
  const [allFamily, setAllFamily] = useState(null);
  const [allRequest, setAllRequest] = useState(null);
  const [approved, setApproved] = useState(null);
  const [rejected, setRejected] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res1=await fetch("http://localhost:5000/api/v1/kalupra/getcomplaint");
      const data1= await res1.json();
      setComplaints(data1.length);

      const res2=await fetch("http://localhost:5000/api/v1/kalupra/getallusers");
      const data2= await res2.json();
      setAllFamily(data2.length);
      
      const requests = data2.filter(user => user.isEnabled === null);
      setAllRequest(requests.length);

      const approvedUsers = data2.filter(user => user.isEnabled === true);
      setApproved(approvedUsers.length);

      const rejectedUsers = data2.filter(user => user.isEnabled === false);
      setRejected(rejectedUsers.length);
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchData();
  },[])

  const dashboardSections = [
    {
      id: 'family',
      title: 'सभी परिवार',
      description: 'गाँव के सभी पंजीकृत परिवारों का डेटा देखें',
      icon: '👨‍👩‍👧‍👦',
      path: '/admin/allfamily',
      color: '#3B82F6' // blue
    },
    {
      id: 'requests',
      title: 'सभी आवेदन',
      description: 'नए पंजीकरण और अपडेट आवेदन देखें',
      icon: '📄',
      path: '/admin/allrequest',
      color: '#10B981' // green
    },
    {
      id: 'approve',
      title: 'अनुमोदित आवेदन',
      description: 'मंजूर किए गए आवेदनों की सूची',
      icon: '✅',
      path: '/admin/approved',
      color: '#8B5CF6' // purple
    },
    {
      id: 'reject',
      title: 'अस्वीकृत आवेदन',
      description: 'खारिज किए गए आवेदनों की सूची',
      icon: '❌',
      path: '/admin/rejected',
      color: '#EF4444' // red
    },
    {
      id: 'complaints',
      title: 'सभी शिकायतें',
      description: 'ग्रामीणों द्वारा दर्ज शिकायतें देखें',
      icon: '📢',
      path: '/admin/allcomplaint',
      color: '#F59E0B' // amber
    },
    {
      id: 'addEvent',
      title: 'विशेष कार्यक्रम जोड़ें',
      description: 'नए विशेष कार्यक्रम जोड़ें',
      icon: '➕',
      path: '/admin/addSpecialEvent',
      color: ' #3B82F6' // blue
    },
    {
      id: 'addInfo',
      title: 'गाँव की जानकारी जोड़ें',
      description: 'गाँव की नई जानकारी जोड़ें',
      icon: '➕',
      path: '/admin/addInfoVillage',
      color: ' #10B981' 
    },
    {
      id: 'Add Admin',
      title: 'Add Admin',
      description: 'Add New Admin',
      icon: '➕',
      path: '/registration/admin',
      color: ' #10B981' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">गाँव कलुपुरा - प्रबंधन पैनल</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {dashboardSections.map((section) => (
            <Link key={section.id} href={section.path} passHref>
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer transition-all hover:shadow-md"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${section.color}20` }}
                >
                  <span className="text-2xl" style={{ color: section.color }}>
                    {section.icon}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Optional: Stats Summary */}
        <div className="mt-10 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">सारांश</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{allFamily}</p>
              <p className="text-sm text-gray-600">परिवार</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{allRequest}</p>
              <p className="text-sm text-gray-600">आवेदन</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">{approved}</p>
              <p className="text-sm text-gray-600">अनुमोदित</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-red-700">{rejected}</p>
              <p className="text-sm text-gray-600">अस्वीकृत</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-amber-700">{complaints}</p>
              <p className="text-sm text-gray-600">शिकायतें</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
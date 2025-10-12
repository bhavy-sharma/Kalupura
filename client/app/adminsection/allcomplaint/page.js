"use client"
import axios from 'axios';
import React, { useEffect } from 'react'

function AllComplaint() {
    const [complaints, setComplaints] = useState([]);

    useEffect(()=>{
       const fetchData = async () => {
        try {
            const res=await axios.get('/api/admin/addcomplaint');
            setComplaints(res.data);
        } catch (error) {
            console.log("error",error)
        }
       }
       fetchData();
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default AllComplaint

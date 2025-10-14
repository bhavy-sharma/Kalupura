"use client"
import axios from 'axios';
import React, { useEffect } from 'react'

function Allfamily() {
     const [data,setData] = useState([]);
    
    useEffect(()=>{
       const fetchData = async () => {
        try {
            const res=await axios.get('/api/admin/addmember');
            setData(res.data);
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

export default Allfamily

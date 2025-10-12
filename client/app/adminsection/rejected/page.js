"use client"
import axios from 'axios';
import React, { useEffect } from 'react'

function Rejected() {
    const [data,setData] = useState([]);
    
    useEffect(()=>{
       const fetchData = async () => {
        try {
          
            const res=await axios.get('/api/admin/addmember');
            const filtered = res.data.filter((item) => item.isEnable === false);
            setData(filtered);
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

export default Rejected

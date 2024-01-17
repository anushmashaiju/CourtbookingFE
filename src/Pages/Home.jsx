
import React, { useEffect, useState } from 'react'
import MainNavBar from '../Components/Common/MainNavBar'
import AxiosInstance from '../Config/AxiosInstance'
import Cards from '../Components/Cards'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [courtData,setCourtData]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    getAllCourtsData()
  },[])
  const getAllCourtsData=()=>{
    AxiosInstance.get('/users/getAllCourtsData').then((response)=>{
      setCourtData(response.data)

    })
    .catch(err=>{
      
if(err.response.data.message==='unauthorized user'){
localStorage.clear();
navigate("/")}
    })
  }
  
  return (
  <>
    <MainNavBar/>
    <div className='container'>
     <div className='row p-2 gap-3'>
      {courtData.map((court)=><Cards data={court}/>)

     }
 

      
  </div>
  </div>
 
  </>
  )
}

export default Home

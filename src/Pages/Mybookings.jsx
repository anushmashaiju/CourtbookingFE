import React, { useState,useEffect } from 'react'
import AxiosInstance from '../Config/AxiosInstance'
import MybookingCard from '../Components/myBookingCard'
import MainNavBar from '../Components/Common/MainNavBar';

function Mybookings() {
    const [bookings,setBookings]= useState([1,2]);
    useEffect(()=>{
         getMybookingsData()
    },[])
    const getMybookingsData=()=>{
        AxiosInstance.get('/users/getMybookingsData').then((res)=>{
            setBookings(res.data)

        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <>
    <MainNavBar/>
    <div>
        {bookings.map((booking,index)=><MybookingCard bookingData={booking} key={index}/>)}
        </div>
      </>
  )
}

export default Mybookings

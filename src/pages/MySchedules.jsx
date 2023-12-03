import React from 'react'
import MyBookings from '../components/MySchedules/MyBookings'
import Myworks from '../components/MySchedules/Myworks'
import Pagetitle from '../Hooks/Pagetitle'

export default function MySchedules() {
  return (
    <div className='mt-20  '>
      <Pagetitle>My Schedules | HoServiceSwap</Pagetitle>
      <MyBookings></MyBookings>  
      <Myworks></Myworks>           
    </div>
  )
}

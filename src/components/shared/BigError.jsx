import React from 'react'
import ErrorLoita  from '../../assets/ErrorLoita.json'
import Lottie from 'lottie-react'
export default function BigError({children}) {
  return (
    <div className='bg-green-200   flex justify-center items-center  w-full'>
        {/* {children} */}
        <div className='relative h-full'>
          <Lottie animationData={ErrorLoita}></Lottie>
        </div>
    </div>
  ) 
}

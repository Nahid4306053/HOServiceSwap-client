import React from 'react'
import ErrorLoita  from '../../assets/small_error.json'
import Lottie from 'lottie-react'
export default function SmallError({children}) {
  return (
    <div className='bg-green-200   flex justify-center items-center w-full'>
        {/* {children} */}
        <div className='relative h-full'>
          <Lottie className='h-96' animationData={ErrorLoita}></Lottie>
        </div>
    </div>
  ) 
}

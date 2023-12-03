import React from 'react'
import '../../Styles/CategoreyCard.scss'
import { Link } from 'react-router-dom'
import useAos from '../../Hooks/useAos'
export default function CategoreyCard({data}) {
  useAos()
  return (
    <div data-aos="fade-up" className='bg-green-200  catgorey_card overflow-hidden  shadow-lg rounded-lg'>
      <div className='h-32 overflow-hidden cat_img'><img src={data.thumbnail} className='h-full w-full' alt="" /></div>
      <div className='h-full flex justify-center'>
      <h2 className='hover:text-green-800 text-xl text-center my-4 cursor-pointer text-green-600' >
        <Link to={`/services/?category=${data.categoryName}`}>{data.categoryName}</Link>
      </h2>
      </div>
      </div>
  )
}

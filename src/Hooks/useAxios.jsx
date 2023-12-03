import axios from 'axios'
import React from 'react'



const instance = axios.create({
 baseURL:import.meta.env.VITE_API_URL,
 withCredentials:true                   
})

export default function useAxios() {
  


  return instance
}

const getmood = () =>{
   if(localStorage.getItem("mood")){
    return localStorage.getItem("mood")
   }
   else{
    localStorage.setItem("mood","light")
   }
}

const setmood = (value) =>{
  localStorage.setItem("mood",value)
}

export {getmood ,setmood}
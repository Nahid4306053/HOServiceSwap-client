import React, { createContext, useContext, useEffect, useState } from "react";
import { getmood } from "../Utils/Controllmodd";
const DarkmoodContext = createContext();
export const useMood =()=>{
     return useContext(DarkmoodContext)               
}


export default function TemplateMoodContext({ children }) {
  const [Darkmood, setDarkmood] = useState(false);
  // useEffect(() => {
  //   const mood = getmood();
  //   if(mood){
  //   if (mood === "light") {
  //     setDarkmood(false);
  //     const htmltag = document.querySelector("html");
  //     htmltag.setAttribute("data-theme", "light");
  //   } else {
  //     setDarkmood(true);              
  //     const htmltag = document.querySelector("html");
  //     htmltag.setAttribute("data-theme", "dark");
  //   }
  // }
  // }, [Darkmood]);
  return <DarkmoodContext.Provider value={{Darkmood,setDarkmood}}>{children}</DarkmoodContext.Provider>;
}

import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";
import Signup from "../pages/Signup";
import Login from "../pages/logIn";
import AuthnicationContext from "../Context/AuthnicationContext";

import TemplateMoodContext from "../Context/TemplateMoodContext";
import AddService from "../pages/AddService";
import { toast } from "react-toastify";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRouter from "./PrivateRouter";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MySchedules from "../pages/MySchedules";
import AuthHandler from "./AuthHandler";
const CreateDRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthnicationContext><TemplateMoodContext><MainLayouts/></TemplateMoodContext></AuthnicationContext>,
    errorElement: <TemplateMoodContext><Notfound /></TemplateMoodContext>,
    children: [
      {
        path: "/",
        element: <Home/>
      },  
      {
        path: "/add-service",
        loader: async ()=>{
         try{
          const cat =  await fetch(`${import.meta.env.VITE_API_URL}/categories`);
          const area =  await fetch(`/data/areas.json`);
             return { catgoreys : await cat.json() , areas: await area.json()   }
         }catch(err){

           return { catgoreys :"" , areas:""  }
         }
         },
        element: <PrivateRouter><AddService/></PrivateRouter>
      },      
       {
        path:"/login",
        element: <AuthHandler><Login></Login></AuthHandler>
       },
        {
        path:"/services",
        element: <Services></Services>
       },      
        {
        path:"/service-details/:id",
        element: <PrivateRouter><ServiceDetails></ServiceDetails></PrivateRouter>
        }, 
          {
        path:"/my-services",
        element: <PrivateRouter><MyServices></MyServices></PrivateRouter>
        },      
       {
        path:"/signup",
        element: <AuthHandler><Signup></Signup></AuthHandler>
       },      
       {
        path:"/my-schedules",
        element: <PrivateRouter><MySchedules></MySchedules></PrivateRouter>
       }
        ,        
       {
        path: "/update-service/:id",
        loader: async ()=>{
         try{
          const cat =  await fetch(`${import.meta.env.VITE_API_URL}/categories`);
          const area =  await fetch(`/data/areas.json`);
             return { catgoreys : await cat.json() , areas: await area.json()   }
         }catch(err){

           return { catgoreys :"" , areas:""  }
         }
         },
        element: <PrivateRouter><UpdateService/></PrivateRouter>
      },

    ],
  },
]);

export default CreateDRouter;

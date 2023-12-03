import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import axios from "axios";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthnicationContext({ children }) {
  const [Cureentuser, SetCureentuser] = useState();
  const [loading, setloading] = useState(true);
  const auth = getAuth(app);
  const googleprovider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate()
  const  axios = useAxios(); 

  
    const signout = async () => {
    await signOut(auth);
  };
  axios.interceptors.response.use(function (response) {

    return response;
  },async function (error) {
    if(error?.response?.status === 401 || error?.response?.status === 403){
      signout()
      navigate("/login")
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    onAuthStateChanged(auth,async (user) => {
     try{
      if (user) {
        await axios.post(`${import.meta.env.VITE_API_URL}/login`,{uid:user.uid})
       SetCureentuser(user);
       setloading(false);
     } else {
       SetCureentuser();
       await axios.delete(`${import.meta.env.VITE_API_URL}/logout`)
       setloading(false);
     }
     }
     catch(err){
      signout()
      toast.error(`${err?.message}`)
     }
    });
  }, []);

  const continueWithGoogle = async () => {
    
    await signInWithPopup(auth, googleprovider);
  };

  const continueWithGithub = async () => {
    
    await signInWithPopup(auth, githubProvider);
  };

  const Signup = async (username, email, password , avatar) => {
    console.log(username, email, password , avatar)
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: username , photoURL: avatar });
  };

  const SignIn = async (email, password) => {

    await signInWithEmailAndPassword(auth, email, password);
  };



  const sendeVerificationmail = async () => {
    await sendEmailVerification(auth.currentUser);
  };
  const forgetpassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
  
  return (
    <AuthContext.Provider
      value={{
        loading,
        forgetpassword,
        sendeVerificationmail,
        SignIn,
        signout,
        Signup,
        auth,
        setloading,
        continueWithGoogle,
        continueWithGithub,
        Cureentuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

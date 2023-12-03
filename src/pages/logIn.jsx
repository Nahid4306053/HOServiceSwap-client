import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthnicationContext";
import { useMood } from "../Context/TemplateMoodContext";
import Pagetitle from "../Hooks/Pagetitle";
import ScrollTop from "../Hooks/ScrollTop";
import AuthInputBox from "../components/shared/AuthInputBox";
import log_in from "/images/log_in.png";
import log_bg from "/images/login_bg.jpg";
export default function Login() {
  ScrollTop();
  const toastId = useRef(null);
  const { Darkmood } = useMood();
  const getemail = useRef();
  const [Errors, setErrors] = useState([]);
  const {
    continueWithGoogle,
    continueWithGithub,
    forgetpassword,
    auth,
    signout,
    SignIn,
  } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Vpath } = state || {};
  const handleWithGoogle = async () => {
    try {
      await continueWithGoogle();
      toast.success(`${auth.currentUser?.displayName} log in SuccessFully`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //  const handleWithGithub = async () =>{
  //   try{
  //       await continueWithGithub()
  //       navigate("/")
  //   }
  //   catch(err){
  //    console.log(err);
  //   }
  //  }

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      await SignIn(email, password);
    },
    onSuccess: async () => {
      toast.success(`${auth.currentUser?.displayName} Log in Succsessfully`);
      navigate("/");
    },
    onError: (err) => {
      setErrors([err?.message.split("(")[1]]);
    },
  });

  const handelesubmit = async (form) => {
    form.preventDefault();
    let email = form.target.email.value;
    let password = form.target.password.value;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const err = [];

    if (password.trim() === "") {
      err.push("Password is required");
    } else if (!passwordPattern.test(password)) {
      err.push(
        "Password should include one uppercase , one lowercase , one special  character and length should 6 character"
      );
    }
    if (email.trim() === "") {
      err.push("Email is required");
    } else if (!emailPattern.test(email)) {
      err.push("Please provide verified email");
    }
    setErrors(err);

    if (err.length === 0) {
      mutation.mutate({ email, password });
    }
  };

  // const handleForget = async () =>{
  //   if(getemail.current.value.trim() === ""){
  //     setErrors((old)=>[...old , "First type your email in email field then click Forget password"])
  //   }
  //   else{
  //    try{
  //     await forgetpassword(getemail.current.value);
  //     alert("Please check you mail we give a link for forget password")
  //     setErrors([])
  //    }
  //    catch(err){
  //     setErrors((old)=>[...old , err.message.split("/")[1].replace(/-\)|-/g, " ").replace(").", " ") ])
  //    }
  //   }
  // }

  return (
    <>
      <Pagetitle>log in - TechNoWorld</Pagetitle>
      {/* Same as */}

      <div
        style={{
          backgroundImage: `url(${log_bg})`,
        }}
        className="hero  pb-20 min-h-screen lg:mt-[150px] mt-32   "
      >
        <div className="overlay absolute h-full w-full bg-black opacity-50"></div>
        <div className="hero-content relative z-10 lg:gap-10  flex container justify-between">
          <div className="flex-1  lg:block hidden">
            <img className="h-full w-full" src={log_in} alt="" />
          </div>
          <div
            className={`card overflow-hidden flex-1 flex justify-stretch md:w-[500px]   shadow-2xl  ${
              Darkmood ? "bg-base-300" : "bg-green-100"
            }`}
          >
            <div className="card-body relative z-50">
              <div className="text-center">
                <h1 className="text-4xl  text-green-600  font-bold font-Montserrat">
                  Log In
                </h1>
                <h3 className="text-xl mt-2">Log in to your account</h3>
              </div>
              <form onSubmit={handelesubmit}>
                {Errors.length > 0 && (
                  <div className="erorrs text-red-600 my-4 bg-red-200 p-4 rounded-lg">
                    <ul className="list-disc grid gap-2">
                      {Errors.map((ele, ind) => {
                        return (
                          <li key={ind} className="capitalize  ml-4">
                            {ele}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <AuthInputBox
                  type="email"
                  placeholder="Type a verified Email"
                  name="email"
                  label="Email"
                >
                  <i className="fa-regular fa-envelope"></i>
                </AuthInputBox>

                <AuthInputBox
                  type="text"
                  placeholder="Type a strong Password"
                  name="password"
                  label="Password"
                >
                  <i className="fa-regular fa-lock"></i>
                </AuthInputBox>
                <div className="form-control mt-6">
                  <button
                    disabled={mutation.isPending}
                    type="submit"
                    className="btn bg-green-600 hover:bg-green-600 text-white"
                  >
                    {mutation.isPending ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>
                <div className="form-control text-center ">
                  <p className="py-2 mt-5 ">
                    Don't have an account?
                    <Link
                      state={{ Vpath: Vpath ? Vpath : null }}
                      to="/signup"
                      className="text-pink-400"
                    >
                      Sign Up
                    </Link>
                    <br />
                    <span className=" mt-2 block">OR</span>
                  </p>
                </div>
              </form>
              <div className=" flex md:flex-row flex-col gap-4 md:mt-4">
                <button
                  onClick={handleWithGoogle}
                  className="flex-1 btn btn-outline hover:border-green-700  border-green-700 hover:bg-green-600 text-green-600 hover:text-white"
                >
                  Sign in with <i className="text-xl fa-brands fa-google"></i>
                </button>
                {/* onClick={handleWithGithub} */}
                <button disabled className="flex-1 btn text-green-600 ">
                  Sign in with <i className="text-xl fa-brands fa-github"></i>
                </button>
              </div>
            </div>
            <div className="bg-green-200 absolute top-0 left-0 h-full w-full clipshape2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

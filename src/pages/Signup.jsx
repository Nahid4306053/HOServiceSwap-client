import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthnicationContext";
import { useMood } from "../Context/TemplateMoodContext";
import Pagetitle from "../Hooks/Pagetitle";
import ScrollTop from "../Hooks/ScrollTop";
import AuthInputBox from "../components/shared/AuthInputBox";
import log_in from "/images/log_in.png";
import log_bg from "/images/login_bg.jpg";
export default function Signup() {
  const { Darkmood } = useMood();
  ScrollTop();
  const [Errors, setErrors] = useState([]);
  const {
    continueWithGoogle,
    continueWithGithub,
    sendeVerificationmail,
    auth,
    Signup,
    signout,
  } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Vpath } = state || {};

  // const handleWithGoogle = async () => {
  //   try {
  //     await continueWithGoogle();
  //     toast.success(`${auth.currentUser?.displayName} Registration SuccessFully` );
  //     navigate(`${Vpath ? Vpath : "/"}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    mutationFn: async ({ username, email, password, avatar }) => {
      console.log(username, email, password, avatar);
      await Signup(username, email, password, avatar);
    },
    onSuccess: async () => {
      toast.success(
        `${auth.currentUser?.displayName} Registration SuccessFully`
      );
      await signout();
      navigate("/login");
    },
    onError: (err) => {
      setErrors([err?.message.split("(")[1]]);
    },
  });

  const handelesubmit = async (form) => {
    form.preventDefault();
    let username = form.target.username.value;
    let email = form.target.email.value;
    let password = form.target.password.value;
    let avatar = form.target.avatar.value;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const err = [];

    if (username.trim() === "" || typeof username !== "string") {
      err.push("Username is requred");
    } else if (username.trim().length < 3 || username.trim().length > 25) {
      err.push("Username should max 25 and min 3 charecter");
    }

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
      err.push("Please provide a verified email");
    }

    if (avatar.trim() === "") {
      err.push("Profile Photo is required");
    }

    setErrors(err);

    if (err.length === 0) {
      mutation.mutate({ username, email, password, avatar });
    }
  };

  return (
    <>
      <Pagetitle>Sign up | HOServiceSwap</Pagetitle>
      <div
        style={{ backgroundImage: `url(${log_bg})` }}
        className="hero  pb-20 min-h-screen lg:mt-[150px] mt-32"
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
                <h1 className="text-4xl  text-green-600  font-bold">Sign up</h1>
                <h3 className="text-xl mt-2">Create a new Acccount </h3>
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
                  type="text"
                  placeholder="Type Your Name"
                  name="username"
                  label="Username"
                >
                  <i className="fa-light fa-id-card"></i>
                </AuthInputBox>

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

                <AuthInputBox
                  name="avatar"
                  type="url"
                  placeholder="Photo Url"
                  label="Profile Photo url"
                >
                  <i className="fa-light fa-user"></i>
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
                      "Sign Up"
                    )}
                  </button>
                </div>

                <div className="form-control text-center ">
                  <p className="py-2 mt-5 ">
                    Alraedy have an account?
                    <Link
                      state={{ Vpath: Vpath ? Vpath : null }}
                      to="/login"
                      className="text-pink-400"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="bg-green-200 absolute top-0 left-0 h-full w-full clipshape2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

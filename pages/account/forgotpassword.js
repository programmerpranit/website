import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCPassChange = (e) => {
    setCpassword(e.target.value);
  };

  const sendMail = async () => {
    let data = {
      email: email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await a.json();
    
    if (a.status == 200) {
      toast.info("Email has been sent");
    } else {
      toast.error(res.message);
    }
  };
  const resetPassword = async () => {
    if (password === cpassword) {
      let data = {
        password: password,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (a.status == 200) {
        toast.info("Password has been changed");
      } else {
        toast.error("Unknown error happened while sending reset email");
      }
    } else {
      toast.error("New password and confirm password are not same");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="container px-5 py-10 mx-auto flex">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {router.query.token && (
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col m-auto border w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="">Reset Password</h2>
          <p className=" mb-5 text-gray-600">Please Enter New Password.</p>

          <div className="relative mb-1">
            <label htmlFor="loginEmail" className="leading-7 text-sm">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePassChange}
              name="loginEmail"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-20 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out peer"
            />
            <p className="invisible mt-1 peer-invalid:visible text-red text-xs">
              Please enter a valid email address
            </p>
          </div>
          <div className="relative mb-1">
            <label htmlFor="loginEmail" className="leading-7 text-sm">
              Conform Password
            </label>
            <input
              type="password"
              value={cpassword}
              onChange={handleCPassChange}
              name="cPassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-20 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out peer"
            />
          </div>
          <button
            disabled={(password !== cpassword) || password == ""}
            onClick={resetPassword}
            className="text-white mt-5 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-slate-400"
          >
            Reset Password
          </button>
        </div>
      )}
      {!router.query.token && (
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col m-auto border w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="">Forgot Password</h2>
          <p className=" mb-5 text-gray-600">Please Provide Your Email.</p>

          <div className="relative mb-1">
            <label htmlFor="loginEmail" className="leading-7 text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              id="loginEmail"
              name="loginEmail"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-20 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out peer"
            />
            <p className="invisible mt-1 peer-invalid:visible text-red text-xs">
              Please enter a valid email address
            </p>
          </div>

          <button
            onClick={sendMail}
            className="text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Forgotpassword;

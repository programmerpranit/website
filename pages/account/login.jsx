import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = ({setUser}) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    var data = {
      email: email,
      password: password,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchResponse = await fetch(
      "http://localhost:3000/api/auth/login",
      settings
    );
    const response = await fetchResponse.json();

    if (fetchResponse.status === 200) {
      localStorage.setItem('token', response.token)
      toast.success(response.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUser(response.token)
      
      router.push('/')
    } else {
      toast.error(response.message);
    }

    

  };

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
      <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col m-auto border w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="">Login</h2>
        <p className=" mb-5 text-gray-600">
          Please Provide Your Login Credentials
        </p>
        
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
        <div className="relative mb-4">
          <label htmlFor="loginPassword" className="leading-7 text-sm">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="loginPassword"
            name="loginPassword"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {/* <Link href={'/account/forgotpassword'}><strong className="text-blue text-right text-xs cursor-pointer">Forgot Password</strong></Link> */}
        </div>

        <button
          onClick={login}
          className="text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Login
        </button>
        <p className="text-sm text-gray-500 mt-3">
          New to this website <Link href={'/account/signup'}><strong className="text-blue cursor-pointer">Create Account</strong></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

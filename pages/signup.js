import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = async () => {
    var data = {
      name: name,
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
      "http://localhost:3000/api/auth/signup",
      settings
    );
    const response = await fetchResponse.json();
    
    if(fetchResponse.status === 201) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
        <h2 className="">Create Account</h2>
        <p className=" mb-5 text-gray-600">
          Please Provide Your Information to creating a account for you
        </p>
        <div className="relative mb-4">
          <label htmlFor="signupName" className="leading-7 text-sm ">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            id="signupName"
            name="signupName"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-1">
          <label htmlFor="signupEmail" className="leading-7 text-sm">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            id="signupEmail"
            name="signupEmail"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-20 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out peer"
          />
          <p className="invisible mt-1 peer-invalid:visible text-red text-xs">
            Please enter a valid email address
          </p>
        </div>
        <div className="relative mb-4">
          <label htmlFor="signupPassword" className="leading-7 text-sm">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="signupPassword"
            name="signupPassword"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <button
          onClick={signup}
          className="text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Create Account
        </button>
        <p className="text-xs text-gray-500 mt-3">
        Already have an account <Link href={'/login'}><strong className="text-blue cursor-pointer">Login</strong></Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

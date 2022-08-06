import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myaccount = ({ setUser }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const getData = async () => {
    const token = localStorage.getItem("token");
    var data = {
      token: token,
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
      "http://localhost:3000/api/auth/user",
      settings
    );
    const response = await fetchResponse.json();


    if (fetchResponse.status == 200) {
      setToken(token);
      setName(response.name);
      setEmail(response.email);
    } else {
      toast.error("Login first to see account details");
      router.push("/account/login");
    }
  };

  const changename = async () => {
    var data = {
      token: token,
      name: name,
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
      "https://pranitpatil.com/api/auth/changename",
      settings
    );
    const response = await fetchResponse.json();

    if (fetchResponse.status == 200) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pcontainer">
      <h2 className="my-16">My Account</h2>

      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {token != null && (
        <div className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            id="signupName"
            name="signupName"
            className="w-full md:w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input
            type="text"
            value={email}
            readOnly
            id="signupName"
            name="signupName"
            className="w-full md:w-1/2 my-5 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />

          <button
            onClick={changename}
            className="cursor-pointer mt-5 md:w-1/2 text-sm text-black uppercase font-semibold py-1 px-4 rounded-md bg-white  hover:bg-white hover:text-blue border-blue border ease-in-out"
          >
            Change Name
          </button>

          {/* <Link href={"/change-password"}>
            <button className="cursor-pointer my-5 md:w-1/2 text-sm text-black uppercase font-semibold py-1 px-4 rounded-md bg-white  hover:bg-white hover:text-blue border-blue border ease-in-out">
              Change Password
            </button>
          </Link> */}

          <button
            onClick={logout}
            className="cursor-pointer my-4 md:w-1/2 text-sm  uppercase font-semibold py-1 px-4 rounded-md text-white  hover:bg-white hover:text-blue border-blue border ease-in-out"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Myaccount;

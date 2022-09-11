import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../util/baseUrl";


const AdminPanel = () => {
  const router = useRouter();
  const [superUser, setSuperUser] = useState(false)

  const validate = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      router.push("/account/login");
    }

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
      `${baseUrl}/api/auth/user`,
      settings
    );
    const response = await fetchResponse.json();

    if (fetchResponse.status == 200) {
        setSuperUser(response.superuser);
        // console.log(response)
    } else {
        toast.error("You not have access to this page");
    }

  };

  useEffect(() => {
    validate();
  }, [])
  

  // then make a request to validate credentials
  // if valid show the page else you are not a admin

  return (
    // <div>List of all Models with add button and onClick go to that page</div>
<>
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
    {superUser && <div className="pcontainer h-screen">

      <h1 className="my-10">Admin Panel</h1>

      <div className="model my-2 flex justify-between w-3/4 border-2 shadow-xl border-blue rounded-md hover:bg-sky-50 p-3">
        <Link href={"/admin/blog"}>
          <h4 className="cursor-pointer hover:text-blue">Blogs</h4>
        </Link>

        <br/>

        <Link href={"/admin/blog/addblog"}>
          <h4 className="cursor-pointer hover:text-blue">+ Add</h4>
        </Link>
      </div>

      <div className="model my-2 flex justify-between w-3/4 border-2 shadow-xl border-blue rounded-md hover:bg-sky-50 p-3">
        <Link href={"/admin/project"} >
          <h4 className="cursor-pointer hover:text-blue">Projects</h4>
        </Link>

        <br/>

        <Link href={"/admin/project/add"} >
          <h4 className="cursor-pointer hover:text-blue">+ Add</h4>
        </Link>
      </div>



    </div> }


    {!superUser && <div className="pcontainer h-screen">
      <h2 className="my-10">You are not a admin</h2>

    </div> }
    </>
  );
};

export default AdminPanel;

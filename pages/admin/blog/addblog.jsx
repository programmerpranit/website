import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import slugify from "slugify";

const AddBlog = () => {
  const router = useRouter();
  const [superUser, setSuperUser] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState('');
  const [token, setToken] = useState(null)

  const createSlug = async () => {
    const generatedSlug = slugify(title,{
      replacement: '-',  
      lower: true
    })

    setSlug(generatedSlug);

  }



  const handleOnChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    }
    if (e.target.name == "slug") {
      setSlug(e.target.value);
    }
  };

  const handleTextarea = (e) => {
    e.target.style.height = "auto";
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

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
      "http://localhost:3000/api/auth/user",
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

  const addBlog = async () => {

    const token = localStorage.getItem("token");

    var data = {
      title: title,
      slug: slug,
      content: " ",
      published: false,
      token: token
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
      "http://localhost:3000/api/blog",
      settings
    );

    const response = await fetchResponse.json();

    if(fetchResponse.status == 201) {
      router.push(`/admin/blog/${response._id}`)
    } else {
      // console.log(response)
      toast.error("Failed to add blog title and slug must be unique")
    }

  }

  useEffect(() => {
    validate();
  }, []);

  return (
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

      {superUser && (
        <div className="md:mx-20 mt-10 flex flex-col  md:flex-row">
          <div className="ads md:w-3/12 my-44 md:block hidden ">
            
          </div>

          <div className="content mx-4 md:w-7/12 ">
            

            <textarea
              name="title"
              value={title}
              onKeyUp={handleTextarea}
              onChange={handleOnChange}
              className="  text-[2.5rem] w-full max-h-screen  resize-none font-bold leading-10 outline-none "
              placeholder="Enter Your Title"
            ></textarea>
            <input type="text" 
              name="slug"
              value={slug}
              onChange={handleOnChange}
              className='w-full my-4 p-2 outline-none bg-slate-100' 
              placeholder="slug"/>
            <button className="px-4  py-1 bg-white border-blue border rounded-md" onClick={createSlug}>Generate Slug</button>

            
          </div>

          <div className="about md:w-3/12 m-5 ">
            <button className="text-white  px-4 py-1 rounded-md" onClick={addBlog}>Create Blog</button>
          </div>
        </div>
      )}

      {!superUser && (
        <div className="pcontainer h-screen">
          <h2 className="my-10">You are not a admin</h2>
        </div>
      )}
    </>
  );
};

export default AddBlog;

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../../util/baseUrl";

import { Editor } from "@tinymce/tinymce-react";

import Blog from "../../../models/Blog";
import dbConnect from "../../../middleware/mongo";

const EditBlog = ({ blog }) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const [superUser, setSuperUser] = useState(false);

  const [media, setMedia] = useState("");

  const [title, setTitle] = useState(blog?.title);
  const [image, setImage] = useState(blog?.image);
  const [content, setContent] = useState(blog?.content);
  const [slug, setSlug] = useState(blog?.slug);
  const [category, setCategory] = useState(blog?.category);
  const [tags, setTags] = useState(blog?.tags);
  const [published, setPublished] = useState(blog?.published);

  const [blogId, setBlogId] = useState(null);

  const handleOnChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    }
    if (e.target.name == "category") {
      setCategory(e.target.value);
    }
    if (e.target.name == "slug") {
      setSlug(e.target.value);
    }
    if (e.target.name == "content") {
      setContent(e.target.value);
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

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "website");
    data.append("cloud_name", "pranit");


    const res = await fetch(
      "https://api.cloudinary.com/v1_1/pranit/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();

    if(res.ok) {
      toast.success("image uploaded sucessfully");
      setImage(res2.secure_url);
      console.log(res2)
      console.log(res2.secure_url)
      console.log(image)
    }

  };

  const draft = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      router.push("/account/login");
    }

    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

    console.log(image)

    var data = {
      token: token,
      title: title,
      content: content,
      category: category,
      slug: slug,
      image: image,
      id: blog._id,
      published: false,
    };

    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchResponse = await fetch(
      `${baseUrl}/api/blog`,
      settings
    );
    const response = await fetchResponse.json();

    if (fetchResponse.status == 200) {
      toast.success(response.message);
      setPublished(false)
    } else {
      toast.error(response.message);
    }
  };


  const publish = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      router.push("/account/login");
    }

    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

    var data = {
      token: token,
      title: title,
      content: content,
      category: category,
      slug: slug,
      image: image,
      id: blog._id,
      published: true,
    };

    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchResponse = await fetch(
      `${baseUrl}/api/blog`,
      settings
    );
    const response = await fetchResponse.json();

    if (fetchResponse.status == 200) {
      toast.success(response.message);

      setPublished(true)

    } else {
      toast.error(response.message);
    }
  };


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

      {superUser && blog && (
        <div className="md:mx-20 mt-10 flex flex-col  md:flex-row">
          <div className="ads md:w-3/12 my-44 md:block hidden ">
            {blogId && <p>{blogId}</p>}
          </div>

          <div className="content mx-4 md:w-7/12  ">
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleOnChange}
              className="text-gray-500 mb-5 uppercase font-semibold outline-none "
              placeholder="ENTER CATEGORY"
            />

            <textarea
              name="title"
              value={title}
              onKeyUp={handleTextarea}
              onChange={handleOnChange}
              className="  text-[2.5rem] w-full max-h-screen  resize-none font-bold leading-10 outline-none "
              placeholder="Enter Your Title"
            ></textarea>

            {/* <div className="flex justify-between">
            <p className="text-gray-500 font-semibold">12 Dec, 2017</p>
            <p className="text-gray-500 font-semibold mx-5">12 Dec, 2017</p>
          </div> */}

            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={blog.content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "checklist",
                  "export",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | code table help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div className="about md:w-3/12 flex h-[200vh]">
            <div className="h-screen md:mt-5 sticky top-0 pt-10">
              <div className="author md:ml-4 rounded-lg">
                {blog && published && (
                  <div className="flex">
                  <p className="text-green-700 mr-5 font-semibold m-1 mb-3">
                    Published
                  </p>

                  <Link href={`/blog/${blog.slug}`}><p className="text-blue mr-5 cursor-pointer m-1 mb-3">
                    Preview
                  </p></Link>
                  </div>
                )}
                {blog && !published && (
                  <p className="text-green-700 font-semibold m-1 mb-3">Draft</p>
                )}

                <button
                  className="px-5 py-1 mx-1 rounded-md text-white"
                  onClick={draft}
                >
                  Draft
                </button>
                <button
                  className="px-5 py-1 mx-1 rounded-md text-white"
                  onClick={publish}
                >
                  Publish
                </button>

                <input
                  type="text"
                  name="slug"
                  value={slug}
                  onChange={handleOnChange}
                  className="text-gray-500 my-5 p-2 w-full rounded-md text-sm border outline-none border-blue "
                  placeholder="slug"
                />


                <p className="my-3 font-semibold text-black">Featured Image</p>

                {!image && <img
                  src={media ? URL.createObjectURL(media) : "" }
                  alt=""
                />}

                {image && <img src={image} alt="" />}

                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  className="mt-2"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
                <br />
                <br />

                <button
                  className="px-5 py-1 mx-1 rounded-md text-white"
                  onClick={imageUpload}
                >
                  upload to cloud
                </button>

                <br />
                <br />
                
              </div>
            </div>
          </div>
        </div>
      )}

      {!superUser && (
        <div className="pcontainer flex justify-center items-center h-screen">
          <h2 className="text-center">You are not a admin</h2>
        </div>
      )}
      {!blog && (
        <div className="pcontainer flex justify-center items-center h-[80vh]">
          <h2 className="text-center">No Such Blog Found</h2>
        </div>
      )}
    </>
  );
};

export default EditBlog;

export async function getServerSideProps(context) {
  await dbConnect();

  const id = context.query.id;

  let blogJson;

  try {
    const blog = await Blog.findById(id);
    blogJson = JSON.parse(JSON.stringify(blog));
  } catch (error) {
    const blog = null;
    blogJson = JSON.parse(JSON.stringify(blog));
  }

  return {
    props: { blog: blogJson }, // will be passed to the page component as props
  };
}

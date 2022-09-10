import React, { useEffect, useState } from "react";
import dbConnect from "../../../middleware/mongo";
import Blog from "../../../models/Blog";
import Link from "next/link";
import { useRouter } from "next/router";
import baseUrl from "../../util/baseUrl";

const BlogAdmin = ({ blogs }) => {

  const [superUser, setSuperUser] = useState(null);
  const router = useRouter();

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
  }, []);

  return (
    <div className="pcontainer px-5 py-24 mx-auto">
      <div className="-my-8 divide-y-2 divide-gray-100">

        {blogs.map((blog)=> (
          <div className="py-8 flex flex-wrap md:flex-nowrap" key={blog._id}>
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            {blog.published && <p className="text-blue font-semibold">Published</p>}
            {!blog.published && <p className=" font-semibold">Draft</p>}
          </div>
          <div className="md:flex-grow">
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              {blog.title}
            </h2>
            <p className="leading-relaxed">
              {blog.slug}
            </p>

            <div className="flex">


            <Link href={`/admin/blog/${blog._id}`}><p className="font-semibold cursor-pointer text-blue">Edit</p></Link>
            <Link href={`/blog/${blog.slug}`}><p className="font-semibold cursor-pointer mx-5">Preview</p></Link>
            </div>
          </div>
        </div>
        ))}


        


      </div>
    </div>
  );
};

export default BlogAdmin;


export async function getServerSideProps(context) {
  await dbConnect();


  let blogs;

  try {
    const data = await Blog.find({});
    blogs = JSON.parse(JSON.stringify(data));
  } catch (error) {
    const data = [];
    blogs = JSON.parse(JSON.stringify(data));
  }

  return {
    props: { blogs }, // will be passed to the page component as props
  };
}

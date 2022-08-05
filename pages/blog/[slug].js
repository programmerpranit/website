import React from "react";
import Head from "next/head";
import Blog from "../../models/Blog";
import Link from "next/link";
import dbConnect from "../../middleware/mongo";
import Image from "next/image"

const FullBlog = ({ blog }) => {
  return (
    <>
      {blog && (
        <Head>
          <title>{blog.title}</title>
        </Head>
      )}
      {!blog && (
        <Head>
          <title>Blog Not Found</title>
        </Head>
      )}

      {!blog && (
        <div className="pcontainer h-[80vh] flex justify-center flex-col items-center text-center">
          <h3>Sorry No Such Blog Found</h3>
          <br />
          <h4>
            {" "}
            <Link href={"/blog"}>
              <span className="text-blue cursor-pointer">Click here</span>
            </Link>{" "}
            to check my latest blogs
          </h4>
        </div>
      )}

      {blog && (
        <div className="md:mx-20 mt-10 flex flex-col  md:flex-row">
          <div className="ads md:w-3/12 my-44 md:block hidden ">
            <h4>Tags</h4>
          </div>

          <div className="content mx-4 md:w-7/12  ">
            <p className="text-gray-500 mb-5 uppercase font-semibold">
              {blog && blog.category}
            </p>

            <h1 className="mb-5">{blog.title}</h1>

            <div className="flex justify-between">
              <p className="text-gray-500 font-semibold">12 Dec, 2017</p>
              <p className="text-gray-500 font-semibold mx-5">12 Dec, 2017</p>
            </div>

<br /><br />
            {blog.image && <Image src={blog.image} width={100} height={50} layout="responsive"></Image>}

            {/* <img src={blog.image} alt="" className="my-7" /> */}

            {blog && <div className="content" 

            dangerouslySetInnerHTML={{__html: blog.content}} />}

            
          </div>

          <div className="about md:w-3/12 flex h-[200vh]">
            <div className="h-screen   md:mt-40 sticky top-0 pt-10">
              <div className="author md:ml-4 p-5 h-auto  border border-blue rounded-lg">
                <h5>Pranit Patil</h5>
                <p className="font-semibold mb-5">
                  Software Development Engineer
                </p>
                <p className="text-sm text-black">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Expedita nisi alias vel magni atque, commodi eligendi corrupti
                  eius dolorum possimus aliquid dolor unde delectus ea
                  architecto, at laudantium, est consectetur adipisci{" "}
                </p>

                <h6 className="my-5">Connect Me</h6>

                <hr />
                <br />

                <h5>Latest Blogs</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullBlog;

export async function getServerSideProps(context) {

  await dbConnect();
  
  const slug = context.query.slug;

  const blog = await Blog.findOne({ slug: slug });

  const blogJson = JSON.parse(JSON.stringify(blog));

  return {
    props: { blog: blogJson }, 
  };
}

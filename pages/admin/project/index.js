import React, { useEffect, useState } from "react";
import baseUrl from "../../../util/baseUrl";
import dbConnect from "../../../middleware/mongo"
import Project from "../../../models/Project"
import Link from "next/link";


const ProjectAdmin = ({ projects }) => {
  const [superUser, setSuperUser] = useState(false);

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
    const fetchResponse = await fetch(`${baseUrl}/api/auth/user`, settings);
    const response = await fetchResponse.json();

    if (fetchResponse.status == 200) {
      setSuperUser(response.superuser);
      // console.log(response)
    }
  };

  useEffect(() => {
    validate()
  }, [])
  

  return (
    <>
      {superUser && (
        <div className="flex flex-wrap mx-52">
        {projects && projects.map((work, index) => (

          <Link href={`/admin/project/${work._id}`} key={index}>
          <div className="p-4 md:w-1/3" >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ease-in-out transition-shadow ">
              {work.featuredImage != "" && <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={work.featuredImage}
                alt="blog"
              />}
              {work.featuredImage == "" && <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://dummyimage.com/721x401"
                alt="blog"
              />}
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  <div className="flex">
                  {work.tags && work.tags.map((category)=>(
                      <li key={category}
                          className='mr-2 border-2 rounded px-2 hover:text-blue text-sm list-none uppercase font-semibold'
                      >{category}</li>
                  )) }
                  </div>
                </h2>
                <h1 className="title-font text-lg font-semibold text-gray-900 mb-3">
                  {work.title}
                </h1>
                <p className="leading-relaxed mb-3">
                  {work.shortDesc}
                </p>
                {/* <div className="flex items-center flex-wrap">
                  <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                    Learn More
                  </a>
                </div> */}
              </div>
            </div>
          </div></Link>
        ))}
      </div>
      )}

      {!superUser && (
        <div className="pcontainer flex justify-center items-center h-screen">
          <h2 className="text-center">You are not a admin</h2>
        </div>
      )}
    </>
  );
};

export default ProjectAdmin;

export async function getServerSideProps() {
  await dbConnect();

  let projects;

  try {
    const data = await Project.find({});
    projects = JSON.parse(JSON.stringify(data));
  } catch (error) {
    const data = [];
    projects = JSON.parse(JSON.stringify(data));
  }

  return {
    props: { projects }, // will be passed to the page component as props
  };
}

import React, { useEffect, useState } from "react";
import baseUrl from "../util/baseUrl";
import Link from "next/link";

const Projects = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");


  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    if (item === 'ALL') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
    }
  };

  const fetchWork = async () => {
    const fetchResponse = await fetch(
      `${baseUrl}/api/project/list`
    );
    const response = await fetchResponse.json();
    if (fetchResponse.status == 200) {
      console.log(response.reverse())
      setFilterWork(response.reverse());
      setWorks(response.reverse());
    } 
  }

  useEffect(() => {
  

    fetchWork();
    
  }, []);

  return (
    <section>
      <div className="pcontainer pt-40">
        <h2 className="mt-0 pt-0 text-4xl leading-5">QUALITY WORK</h2>
        <h2 className="text-4xl">RECENTLY DONE PROJECT</h2>

        <div className="flex mt-10">
          {["ALL", "APP", "WEB", "BLOCKCHAIN", "ML"].map((item, index) => (
            <div key={index} onClick={() => handleWorkFilter(item)}>
              <li
                className={`mr-7 hover:text-blue cursor-pointer text-sm list-none uppercase font-semibold ${
                  activeFilter === item ? "text-blue font-bold" : ""
                }`}
              >
                {item}
              </li>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {filterWork.map((work, index) => (

            <Link key={index}  href={`/projects/${work.slug}`}>

            <div className="p-4 md:w-1/3 cursor-pointer" >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ease-in-out transition-shadow ">

              {work.featuredImage != "" && 
              <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={work.featuredImage}
                  alt="Project"
                /> }

                {work.featuredImage == "" && <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/720x400"
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
      </div>
    </section>
  );
};

export default Projects;

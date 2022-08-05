import React, { useEffect, useState } from "react";

const Projects = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tag.includes(item)));
    }
  };

  useEffect(() => {
    const data = [
      {
        name: "Portfolio Website",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing",
        image: "https://dummyimage.com/721x401",
        tag: ['All', 'APP']
      },
      {
        name: "Portfolio Website",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing",
        image: "https://dummyimage.com/721x401",
        tag: ['All', 'APP']
      },
      {
        name: "Portfolio Website",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing",
        image: "https://dummyimage.com/721x401",
        tag: ['All', 'ML']
      },
      {
        name: "Portfolio Website",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing",
        image: "https://dummyimage.com/721x401",
        tag: ['All', 'APP']
      },
    ];

    setFilterWork(data);
    setWorks(data);
  }, []);

  return (
    <section>
      <div className="pcontainer pt-40">
        <h2 className="mt-0 pt-0 leading-5">QUALITY WORK</h2>
        <h2>RECENTLY DONE PROJECT</h2>

        <div className="flex mt-10">
          {["All", "APP", "Web", "BlockChain", "ML"].map((item, index) => (
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
            <div className="p-4 md:w-1/3" key={index}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ease-in-out transition-shadow ">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/721x401"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    <div className="flex">
                    { work.tag.map((category)=>(
                        <li key={category}
                            className='mr-2 border-2 rounded px-2 hover:text-blue text-sm list-none uppercase font-semibold'
                        >{category}</li>
                    )) }
                    </div>
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {work.name}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {work.description}
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

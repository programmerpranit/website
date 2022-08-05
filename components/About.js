import React from "react";

const About = () => {
  return (
    <section>
      <div className="pcontainer h-[100vh] items-center flex md:flex-row flex-col-reverse">
        <div className="image w-full md:w-1/2 md:visible invisible">
            <img src="home-right.png" alt="" />
        </div>

        <div className="text md:w-1/2">

          <h2 className="text-4xl leading-[50px] uppercase" >LET&rsquo;S INTRODUCE ABOUT MYSELF</h2>

          <p className="mb-5 md:text-base text-sm">I am a passionate Developer / Engineer with good knowledge of latest technologies. Experienced in building robust, maintainable and production-quality apps. I&rsquo;m looking forward to grab an opportuninty in the software engineering field to showcase and develop my coding skills.</p>

          {/* <p className="mb-5 md:text-base text-sm">I love to explore different tech domains. Trying to solve real-world problems using tech.</p> */}
          
          <a href="/resume_pranit_patil.pdf" download>

          <button className="inline-flex text-white py-2 px-8 focus:outline-none rounded-md  hover:bg-white hover:text-blue hover:border-blue hover:border-2 mt-5">My Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

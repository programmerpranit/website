import React from "react";
import Image from 'next/image'

const Services = () => {
  return (
    <section>
      <div className="pcontainer text-center">
        <h2>SKILLS</h2>
        <p className="md:w-1/2 px-5 m-auto ">
        I love to explore different tech domains. I try to solve real-world problems using tech.  
        </p>

        <div className="flex flex-wrap mt-10">

          <div className="xl:w-1/4 md:w-1/2 p-3 ">
            <div className="bg-gray-100 p-6 rounded-lg">
              
              <Image src={'/app.svg'} alt={'app'} width={500} height={450}></Image>
              
              {/* <img
                className="h-40 rounded w-full object-cover object-center mb-6"
                src="https://dummyimage.com/720x400"
                alt="content"
              /> */}
              <h4 className="uppercase mb-5">
                Android App Development
              </h4>
              <p className="leading-relaxed text-base">
                I can develop robust and maintainable Android apps in Kotlin.
              </p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4 ">
            <div className="bg-gray-100  hover:shadow-sm p-6 rounded-lg">
            <Image src={'/web.svg'} alt={'app'} width={500} height={450}></Image>
              <h4 className="uppercase mb-5">
                Full Stack Web Development
              </h4>
              <p className="leading-relaxed text-base">
                I work in Next.js and mongoose for full stack applications.
              </p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4 ">
            <div className="bg-gray-100  hover:shadow-sm p-6 rounded-lg">
            <Image src={'/blockchain.svg'} alt={'app'} width={500} height={450}></Image>
              <h4 className="uppercase mb-5">
                Blockchain App Development
              </h4>
              <p className="leading-relaxed text-base">
                Worked in Solidity. Exploring private blockchain.
              </p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4 ">
            <div className="bg-gray-100  hover:shadow-sm p-6 rounded-lg">
            <Image src={'/ml.svg'} alt={'app'} width={500} height={450}></Image>
              <h4 className="uppercase mb-5">
                ML Model Development
              </h4>
              <p className="leading-relaxed text-base">
                I can predict the future with Machine Learning and Deep Learning.
              </p>
            </div>
          </div>
          
          
          
        </div>
      </div>
    </section>
  );
};

export default Services;

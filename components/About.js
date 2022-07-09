import React from "react";

const About = () => {
  return (
    <section>
      <div className="pcontainer h-[100vh] items-center flex md:flex-row flex-col-reverse">
        <div className="image w-full md:w-1/2 md:visible invisible">
            <img src="home-right.png" alt="" />
        </div>

        <div className="text md:w-1/2">

          <h2>LET&rsquo;S INTRODUCE ABOUT MYSELF</h2>

          <p className="mb-5 md:text-base text-sm">Whose given. Were gathered. There first subdue greater. Bearing you Whales heaven midst their. Beast creepeth. Fish days.</p>

          <p className="mb-5 md:text-base text-sm">Is give may shall likeness made yielding spirit a itself together created after sea is in beast beginning signs open god you&rsquo;re gathering whose gathered cattle let. Creature whales fruit unto meat the life beginning all in under give two.</p>
          
          <button className="inline-flex text-white py-2 px-8 focus:outline-none rounded-md  hover:bg-white hover:text-blue border-2 mt-5">My Resume</button>

        </div>
      </div>
    </section>
  );
};

export default About;

import Head from "next/head";
import Image from "next/image";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pranit Patil</title>
        <meta name="description" content="Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="intro">

        <div className=" pcontainer h-[90vh] flex flex-col md:flex-row items-center">

          <div className="p-4 md:w-3/5 md:pt-0 pt-20">
            <h3>HELLO --------------------</h3>
            <h1>I AM PRANT PATIL</h1>
            <h5>SOFTWARE ENGINEER</h5>
          </div>

          <div className="md:w-2/5 ">

            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/home-right.png"
            />
          </div>
        
        </div>

      </section>

      <About/>

    </>
  );
}

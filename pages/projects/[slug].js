import React from "react";
import Project from "../../models/Project";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dbConnect from "../../middleware/mongo";

const ProjectDetails = ({ project }) => {
  return (
    <>
      {project && (
        <Head>
          <title>{project.title}</title>
        </Head>
      )}
      {!project && (
        <Head>
          <title>Project Not Found</title>
        </Head>
      )}

      {!project && (
        <div className="pcontainer h-[80vh] flex justify-center flex-col items-center text-center">
          <h3>Sorry No Project Found</h3>
          <br />
          <h4>
            {" "}
            <Link href={"/projects"}>
              <span className="text-blue cursor-pointer">Click here</span>
            </Link>{" "}
            to check my other Projects
          </h4>
        </div>
      )}

      {project && (
        <div className="md:mx-20 mt-10 flex flex-col md:flex-row">
          <div className="w-4/12">
            {project.featuredImage != "" && <Image src={project.featuredImage} alt="image" width={500} height={500} />}
          </div>

          <div className="md:w-8/12 p-10">
            <h1 className="py-5">{project.title}</h1>

            <div className="flex my-5">
              {/* ["react", "javascript", "next.js", "mongodb"] */}

              {project.stack &&
                project.stack.map((stack) => (
                  <li
                    key={stack}
                    className="mr-2 border-2 rounded px-3 py-1 bg-slate-200 text-sm list-none uppercase font-semibold"
                  >
                    {stack}
                  </li>
                ))}
            </div>

            <div className="flex md:flex-row flex-col py-4">

              {project.github && (
                <a  href={project.github} target="_blank" rel="noreferrer">
                  <p className="font-semibold text-black hover:text-blue cursor-pointer mr-4">
                    Source Code
                  </p>
                </a>
              )}
              {project.link != "" && (
                <a  href={project.link} target="_blank" rel="noreferrer">
                  <p className="font-semibold text-black hover:text-blue cursor-pointer mr-4">
                  Deployed Link
                  </p>
                </a>
              )}
              {project.demo != "" && (
                <a  href={project.github} target="_blank" rel="noreferrer">
                  <p className="font-semibold text-black hover:text-blue cursor-pointer mr-4">
                    Demo Video
                  </p>
                </a>
              )}

              
            </div>

            <p className="py-5 text-black">{project.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;

export async function getServerSideProps(context) {
  await dbConnect();

  const slug = context.query.slug;

  let project;

  try {
    const data = await Project.findOne({ slug: slug });
    project = JSON.parse(JSON.stringify(data));
  } catch (error) {
    project = null;
  }

  return {
    props: { project }, // will be passed to the page component as props
  };
}

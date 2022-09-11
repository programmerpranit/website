import React, { useEffect, useState } from "react";
import dbConnect from "../../../middleware/mongo";
import Project from "../../../models/Project";
import baseUrl from "../../../util/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProject = ({ oldProject }) => {
  const [superUser, setSuperUser] = useState(false);

  const [project, setProject] = useState(oldProject);

  const [stack, setStack] = useState("");
  const [tag, setTag] = useState("")

  const [image, setImage] = useState(project.featuredImage);
  const [media, setMedia] = useState("");

  const handleTextarea = (e) => {
    e.target.style.height = "auto";
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

  const publish = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      router.push("/account/login");
    }

    var data = {
      token: token,
      id: oldProject._id,
      title: project.title,
      featuredImage: image,
      shortDesc: project.shortDesc, 
      description: project.description, 
      slug: project.slug, 
      stack: project.stack, 
      tags: project.tags, 
      github: project.github, 
      link: project.link, 
      demo: project.demo 
    };

    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchResponse = await fetch(
      `${baseUrl}/api/project`,
      settings
    );
    const response = await fetchResponse.json();

    console.log(response)

    if (fetchResponse.status == 200) {
      toast.success("Published Successfully");
      // toast.success(response.message);

    } else {
      toast.error(response.message);
    }
  };

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
    } else {
      toast.error("You not have access to this page");
    }
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "website");
    data.append("cloud_name", "pranit");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/pranit/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();

    if (res.ok) {
      toast.success("image uploaded sucessfully");
      setImage(res2.secure_url);
      console.log(res2);
      console.log(res2.secure_url);
      console.log(image);
    }
  };

  useEffect(() => {
    validate();
    console.log(project);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {superUser && project && (
        <div className="md:mx-20 mt-10 flex flex-col md:flex-row">
          <div className="w-4/12">
            <p className="my-3 font-semibold text-blue cursor-pointer" onClick={publish}>Publish Project</p>

            {!image && (
              <img src={media ? URL.createObjectURL(media) : ""} alt="" />
            )}

            {image && <img src={image} alt="" />}

            <input
              type="file"
              name="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => setMedia(e.target.files[0])}
            />
            <br />
            <br />
            <button
              className="px-5 py-1 mx-1 rounded-md text-white"
              onClick={imageUpload}
            >
              upload to cloud
            </button>


            <br /><br />

            <div className="flex">
              <input
                type="text"
                name="stack"
                className="text-gray-500 mb-5 uppercase font-semibold outline-none "
                placeholder="Add TAG"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />

              <p
                className="font-semibold text-black cursor-pointer"
                onClick={() => {
                  console.log(project.tags);
                  let newTags = project.tags;
                  newTags.push(tag);
                  setProject({
                    ...project,
                    tags: newTags,
                  });
                  setTag("");
                }}
              >
                Add
              </p>
            </div>
            <div className="flex my-5">
              {/* ["react", "javascript", "next.js", "mongodb"] */}

              {project.tags &&
                project.tags.map((tag, index) => (
                  <li
                    key={tag}
                    onDoubleClick={() => {     
                      let newTags = project.tags;
                      newTags.splice(index, 1);
                      setProject({
                        ...project,
                        tags: newTags
                      })
                    }}
                    className="mr-2 border-2 rounded px-3 py-1 bg-slate-200 text-sm list-none uppercase font-semibold"
                  >
                    {tag}
                  </li>
                ))}
            </div>


            {/* <Image src="/home-right.png" alt="image" width={500} height={500} /> */}
          </div>


              {/* Second SEction  */}
          <div className="w-8/12 p-10">
            <textarea
              name="title"
              value={project.title}
              onKeyUp={handleTextarea}
              onChange={(e) => {
                setProject({
                  ...project,
                  title: e.target.value,
                });
              }}
              className="  text-[2.5rem] w-full max-h-screen  resize-none font-bold leading-10 outline-none "
              placeholder="Enter Your Title"
            ></textarea>

            <div className="flex">
              <input
                type="text"
                name="stack"
                className="text-gray-500 mb-2 uppercase font-semibold outline-none "
                placeholder="Add Stack"
                value={stack}
                onChange={(e) => {
                  setStack(e.target.value);
                }}
              />

              <p
                className="font-semibold text-black cursor-pointer"
                onClick={() => {
                  console.log(project.stack);
                  let newStack = project.stack;
                  newStack.push(stack);
                  setProject({
                    ...project,
                    stack: newStack,
                  });
                  setStack("");
                }}
              >
                Add
              </p>
            </div>
            <div className="flex my-5">
              {/* ["react", "javascript", "next.js", "mongodb"] */}

              {project.stack &&
                project.stack.map((stack, index) => (
                  <li
                    key={stack}
                    onDoubleClick={() => {
                      let newStack = project.stack;
                      newStack.splice(index, 1);
                      setProject({
                        ...project,
                        stack: newStack
                      })
                    }}
                    className="mr-2 border-2 rounded px-3 py-1 cursor-pointer bg-slate-200 text-sm list-none uppercase font-semibold"
                  >
                    {stack}
                  </li>
                ))}
            </div>

            <div className="flex flex-col py-4">
              <input
                type="text"
                name="github"
                className="text-gray-500 mb-5 font-semibold outline-none "
                placeholder="Github URL"
                value={project.github}
                onChange={(e) => {
                  setProject({
                    ...project,
                    github: e.target.value,
                  });
                }}
              />

              <input
                type="text"
                name="link"
                className="text-gray-500 mb-5 font-semibold outline-none "
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => {
                  setProject({
                    ...project,
                    link: e.target.value,
                  });
                }}
              />

              <input
                type="text"
                name="demo"
                className="text-gray-500 mb-5 font-semibold outline-none "
                placeholder="Demo Video"
                value={project.demo}
                onChange={(e) => {
                  setProject({
                    ...project,
                    demo: e.target.value,
                  });
                }}
              />
            </div>

            <input
              type="text"
              name="shortdesc"
              className="text-gray-500 w-full mb-5 font-semibold outline-none "
              placeholder="Short Description"
              value={project.shortDesc}
              onChange={(e) => {
                setProject({
                  ...project,
                  shortDesc: e.target.value,
                });
              }}
            />

            <textarea
              name="description"
              value={project.description}
              onKeyUp={handleTextarea}
              onChange={(e) => {
                setProject({
                  ...project,
                  description: e.target.value,
                });
              }}
              className="   w-full max-h-screen  resize-none p-2 outline-none border "
              placeholder="Enter Description"
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProject;

export async function getServerSideProps(context) {
  await dbConnect();

  const id = context.query.id;

  let oldProject;

  try {
    const data = await Project.findById(id);
    oldProject = JSON.parse(JSON.stringify(data));
  } catch (error) {
    const data = null;
    oldProject = JSON.parse(JSON.stringify(data));
  }

  return {
    props: { oldProject }, // will be passed to the page component as props
  };
}

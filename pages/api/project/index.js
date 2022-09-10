import Project from "../../../models/Project"
import connectDb from "../../../middleware/mongoose";

import jwt from "jsonwebtoken";

const handler = async (req, res) => {

  const { token } = req.body;
  const user = jwt.decode(token, "jwtsecret");

  if (!user.superuser) {
    return res.status(401).json({ message: "You are not superuser" });
  }

  // if (req.method == "GET") {

  //   const data = await Project.find({});

  //   return res.status(200).json(data);

  // } else 
  
  if (req.method == "POST") {

    const { title, slug, desc } = req.body;

    try {

      let project = new Project({
        title: title,
        slug: slug,
        shortDesc: desc
      });

      await project.save();

      return res.status(201).json(project);

    } catch (error) {
      return res.status(500).json({message: error});
    }

  // } else if (req.method == "PUT") {



    // const { title, slug, published, content, id, category, image } = req.body;

    // try {


    //   await Blog.findByIdAndUpdate(id, {
    //     title: title,
    //     slug: slug,
    //     published: published,
    //     content: content,
    //     category: category,
    //     image: image
    //   });
    //   const blog = await Blog.findById(id);
    //   // await blog.save();

    //   return res.status(200).json(blog);

    // } catch (error) {
    //   console.log(error);
      
    //   return res.status(500).json({ message: "Failed to upload blog" });
      
    //   // return res.status(500).json({ message: "Some Unknown error occured while updating the blog" });
    // }

     
    
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default connectDb(handler);

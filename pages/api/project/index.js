import Project from "../../../models/Project"
import connectDb from "../../../middleware/mongoose";

import jwt from "jsonwebtoken";

const handler = async (req, res) => {

  const { token } = req.body;
  const user = jwt.decode(token, "jwtsecret");

  if (!user.superuser) {
    return res.status(401).json({ message: "You are not superuser" });
  }

  
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

  } else if (req.method == "PUT") {

    console.log(req.body)

    const { id, title, featuredImage, shortDesc, description, slug, stack, tags, github, link, demo } = req.body;

    try {

      await Project.findByIdAndUpdate(id, {
        title, featuredImage, shortDesc, description, slug, stack, tags, github, link, demo
      });

      let project = await Project.findById(id);

      return res.status(200).json(project);

    } catch (error) {
      
      return res.status(500).json({ message: "Some Unknown error occured while updating the Project" });
    }

     
    
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default connectDb(handler);

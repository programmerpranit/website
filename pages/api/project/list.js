import Project from "../../../models/Project"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {

  if (req.method == "GET") {

    const data = await Project.find({});

    return res.status(200).json(data);
 
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default connectDb(handler);

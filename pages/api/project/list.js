import Project from "../../../models/Project"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {

  if (req.method == "GET") {

    try {
      const data = await Project.find({});
      return res.status(200).json(data);
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }

    // const data = [
    //   {
    //     name: "Portfolio Website",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    //     image: "https://dummyimage.com/721x401",
    //     tag: ['All', 'APP']
    //   },
    //   {
    //     name: "Portfolio Website",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    //     image: "https://dummyimage.com/721x401",
    //     tag: ['All', 'APP']
    //   },
    //   {
    //     name: "Portfolio Website",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    //     image: "https://dummyimage.com/721x401",
    //     tag: ['All', 'ML']
    //   },
    //   {
    //     name: "Portfolio Website",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    //     image: "https://dummyimage.com/721x401",
    //     tag: ['All', 'APP']
    //   },
    // ];

 
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default connectDb(handler);

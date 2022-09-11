import Contact from "../contact";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const {email, name, message} = req.body;

        try {
            let contact = new Contact({name, email, message});
            await contact.save();
            res.status(200).json({ message: "Thanks for connecting. I will contact you shortly"})

        } catch (error) {
            res.status(500).json({message: "Some internal error occured try after some time"})
        }
        
    } else {
        res.status(405).json({message:"This method is not allowed"})
    }
}

export default connectDb(handler)
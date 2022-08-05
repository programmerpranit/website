import User from "../../../models/User"
import connectDb from "../../../middleware/mongoose"

var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

import jwt from 'jsonwebtoken'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const {name, token} = req.body;

        const data = jwt.decode(token, "jwtsecret")

        let user = await User.findOne({email: data.user.email})

        if (user) {
            
            User.findOneAndUpdate({email: user.email},{name: name});

            res.status(200).json({ message: "Name Changed", token })
            
        } else {
            res.status(404).json({ message: "User Not Found" })
        }

        
    } else {
        res.status(405).json({message:"This method is not allowed"})
    }
}

export default connectDb(handler)
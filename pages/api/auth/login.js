import User from "../../../models/User"
import connectDb from "../../../middleware/mongoose"

var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

import jwt from 'jsonwebtoken'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const {email, password} = req.body;

        let user = await User.findOne({email: email})

        if (user) {

            const bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
            const pass = bytes.toString(CryptoJS.enc.Utf8);

            if (email == user.email && password == pass) {
                
                var token = jwt.sign({name: user.name, email: user.email, superuser: user.superuser}, 'jwtsecret', {expiresIn: "30d"})

                res.status(200).json({ message: "Successfully Logged In", token })
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" })
            }
        } else {
            res.status(404).json({ message: "User Not Found" })
        }

        
    } else {
        res.status(405).json({message:"This method is not allowed"})
    }
}

export default connectDb(handler)
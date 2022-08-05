import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";
import Forgot from "../../../models/Forgot";

var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {

    let user = await User.findOne({ email: req.body.email });

    if (user) {

      const secret = 'secret1230' + user.password
      const payload = {
        email: user.email,
        id: user.id
      }

      const token = jwt.sign(payload, secret, {expiresIn: '15m'})
      const link = `http://localhost:3000/forgotpassword?token=${token}`

    } else {
      res.status(400).json({ message: "No User Found With given email address" });
    }



  } else {
    res.status(405).json({message:"This method is not allowed"})
  }
};

export default connectDb(handler);

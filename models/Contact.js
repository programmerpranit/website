import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({

    name: {type: String, require:true},
    email: {type: String, require:true},
    message: {type: String, require:true}
    
    
}, {timestamps: true})


mongoose.models = {}

export default mongoose.model("Contact", ContactSchema);

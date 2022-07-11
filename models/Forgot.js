import mongoose from "mongoose";

const ForgotSchema = new mongoose.Schema({

    title: {type: String, required: true, default:""},
    email: {type: String, required: true, unique:True},
    password: {type: String, required: true},
    
    
}, {timestamps: true})


mongoose.models = {}

export default mongoose.model("Blog", BlogSchema);

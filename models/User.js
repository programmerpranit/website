import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {type: String, required: true, default:""},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    superuser: {type: Boolean, required: true, default:false},

}, {timestamps: true})


mongoose.models = {}

export default mongoose.model("User", UserSchema);

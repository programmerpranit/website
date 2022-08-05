import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true},
    image: {type: String, default:""},
    content: {type: String, required:true, default:""},
    slug: {type: String, required:true, unique: true},
    category: {type: String, default:""},
    tags: [
        {type: String}
    ],
    published: {type: Boolean, required:true, default:false}
    
    
}, {timestamps: true})


mongoose.models = {}

export default mongoose.model("Blog", BlogSchema);

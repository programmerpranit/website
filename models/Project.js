import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true},
    featuredImage: {type: String, default:""},
    shortDesc: {type: String, required:true, default:""},
    description: {type: String, default:""},
    slug: {type: String, required:true, unique: true},
    stack: [
        {type: String}
    ],
    tags: [
        {type: String}
    ],
    github: {type: String, default:""},
    link: {type: String, default:""},
    demo: {type: String, default:""},

    
    
}, {timestamps: true})


mongoose.models = {}

export default mongoose.model("Project", ProjectSchema);

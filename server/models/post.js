const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    comments:[{
        text:String,
        commentedBy:{type:ObjectId,ref:"User"}
    }]

},{timestamps:true})

mongoose.model("Post",postSchema)
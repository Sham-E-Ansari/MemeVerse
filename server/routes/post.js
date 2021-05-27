const express = require('express')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,photo} = req.body
    console.log(title,body,photo)
    if(!title || !body || !photo){
        return res.status(422).json({error:"Please fill all fields!!!"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/userpost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(userpost=>{
        res.json({userpost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router
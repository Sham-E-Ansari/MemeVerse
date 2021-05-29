const express = require('express')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.commentedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true

    }).populate("postedBy","_id name")
    .populate("comments.commentedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })

})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.commentedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })

})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        commentedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.commentedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }else{
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
            
        }
    })

})


router.post('/createpost',requireLogin,(req,res)=>{
    const {body,photo} = req.body
    console.log(body,photo)
    if(!body || !photo){
        return res.status(422).json({error:"Please fill all fields!!!"})
    }
    req.user.password = undefined
    const post = new Post({
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
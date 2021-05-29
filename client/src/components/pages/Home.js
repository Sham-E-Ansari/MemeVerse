import React, { useState,useEffect,useContext } from 'react'
import {userContext} from '../../App'
import M from 'materialize-css'
import {Link} from 'react-router-dom'

const Home = () => {
    const [data,setData] = useState([])
    const {state, dispatch}= useContext(userContext)
    useEffect(() => {
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setData(result.posts)
       })
    }, [])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
            
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const postComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const deletePost=(postId)=>{
        fetch(`/deletepost/${postId}`,{
            method: "delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            //M.toast({html:data.message, classes:"#43a047 green darken-1"})
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })

    }
    return(
        <div className="home">
            {
                
                data.map(item=>{
                    console.log(item)
                    return(
                        <div className="card home-card" key={item._id}>
                            <h6 style={{padding:"5px 10px"}}><b><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link></b>
                            {
                                item.postedBy._id == state._id
                                && <i className="material-icons" onClick={()=>deletePost(item._id)} style={{float:"right"}}>delete</i>
                            }
                            </h6>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)?<i className="material-icons" onClick={()=>unlikePost(item._id)} style={{color:"red"}}>favorite</i>
                                :<i className="material-icons" onClick={()=>likePost(item._id)} style={{color:"red"}}>favorite_border</i>
                                }
                                
                                <h6>{item.likes.length} people liked this</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(postComment=>{
                                        return(
                                            <h6 key={postComment._id}><span className="comment-div">{postComment.commentedBy.name}-</span> {postComment.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{ 
                                    e.preventDefault() 
                                    postComment(e.target[0].value,item._id)
                                    }}>
                                    <input type="text" placeholder="add a comment"></input>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            

        </div>
    )
}



export default Home
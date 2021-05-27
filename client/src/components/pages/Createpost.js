import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost =()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [imageUrl,setImageUrl] = useState("")
    useEffect(()=>{
        if(imageUrl){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:imageUrl
                })
            }).then(res=>res.json())
            .then(formdata=>{
                if(formdata.error){
                    M.toast({html: formdata.error, classes:"#ef5350 red lighten-1"})
                }
                else{
                    M.toast({html:"Image Uploaded Successfully!", classes:"#43a047 green darken-1"})
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[imageUrl])

    const fileDetails = ()=>{
        const formdata = new FormData()
        formdata.append("file",image)
        formdata.append("upload_preset","meme-verse")
        formdata.append("cloud_name","memeverser")
        fetch("	https://api.cloudinary.com/v1_1/memeverser/image/upload",{
            method:"post",
            body:formdata
        })
        .then(res=>res.json())
        .then(formdata=>{
            setImageUrl(formdata.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder ="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder ="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Select Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #ef5350 red lighten-1"
            onClick={()=>fileDetails()}>Post</button>
        </div>

    )
}

export default CreatePost
import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <div className="card login-card">
                <h2>Meme Verse</h2>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="btn waves-effect waves-light #ef5350 red lighten-1" onClick={()=>PostData()}>Login</button>
                <h6><Link to="/signin">Already Have An Account? Sign in</Link></h6>
            </div>
       </div>
    )
}



export default Signup
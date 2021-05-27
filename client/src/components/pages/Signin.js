import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {userContext} from '../../App'

const Signin = () => {
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed in success!", classes:"#43a047 green darken-1"})
                history.push('/')
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
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="btn waves-effect waves-light #ef5350 red lighten-1" onClick={()=>PostData()} >Login</button>
                <h6><Link to="/signup">Don't Have An Account? Sign Up</Link></h6>
            </div>
       </div>
    )
}



export default Signin
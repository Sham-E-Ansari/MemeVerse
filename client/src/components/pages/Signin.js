import React from 'react'
import {Link} from 'react-router-dom'

const Signin = () => {
    return(
       <div className="mycard">
            <div className="card login-card">
                <h2>Meme Verse</h2>
                <input type="text" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <button className="btn waves-effect waves-light #ef5350 red lighten-1">Login</button>
                <h6><Link to="/signup">Don't Have An Account? Sign Up</Link></h6>
            </div>
       </div>
    )
}



export default Signin
import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {userContext} from '../App'
const Navbar = () => {
    const {state,dispatch} = useContext(userContext)
    const renderList=()=>{
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>
            ]
        }else {
            return [
                <li><Link to="/signin">Sign in</Link></li>,
                <li><Link to="/signup">Sign Up</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
                <div className="navigation">
                    <Link to={state?"/":"/signin"} className="brand-logo left">Meme Verse</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderList()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
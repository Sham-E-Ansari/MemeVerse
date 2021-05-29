import React,{useState,useEffect,useContext} from 'react'
import {userContext} from '../../App'
const Profile = () => {
    const {state,dispatch} = useContext(userContext)
    const [userPhotos,setuserPhotos] = useState([])
    
    useEffect(() => {
       fetch('/userpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setuserPhotos(result.userpost)
       })
    }, [])
    return(
        <div style={{maxWidth:"600px", margin:"0px auto"}}>
            <div className="profile-card">
                <div>
                    <img alt="Sami" style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="http://www.damodarcollege.edu.in/web/wp-content/uploads/2021/01/sample-photo1.jpg"/>
                </div>
                <div>
                    <h4>{state.name}</h4>
                    <div className="profile-info">
                        <h6>{userPhotos.length} posts</h6>
                        <h6>{state.followers.length} followers</h6>
                        <h6>{state.following.length} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    userPhotos.map(item=>{
                        return(
                            <img className="gallery-item" key={item._id} src={item.photo} alt={item.titile}/>
                        )
                    })
                }    
            </div>
        </div>
    )
}



export default Profile
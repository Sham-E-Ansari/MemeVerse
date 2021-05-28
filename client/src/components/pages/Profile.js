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
                    src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div>
                    <h4>{state.name}</h4>
                    <div className="profile-info">
                        <h6>{userPhotos.length} posts</h6>
                        <h6>10 followers</h6>
                        <h6>10 following</h6>
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
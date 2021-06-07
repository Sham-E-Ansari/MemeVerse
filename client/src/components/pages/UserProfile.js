import React,{useState,useEffect,useContext} from 'react'
import {userContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const {state,dispatch} = useContext(userContext)
    const [userProfile,setuserProfile] = useState(null)
    const {userid} = useParams()
    const [followState,setfollowState]= useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setuserProfile(result)
        })
     },[])
     const followUser=()=>{
         fetch('/followUser',{
             method:"put",
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt"),
                 "content-Type":"application/json"
             },
             body:JSON.stringify({
                 followId: userid
             })
         }).then(res=>res.json())
         .then(data=>{
            dispatch({
                type:"UPDATE",
                payload:{
                    following:data.following,
                    followers:data.followers
            }})
            localStorage.setItem("user",JSON.stringify(data))
            setuserProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setfollowState(false)
        })
     }
     const unfollowUser=()=>{
        fetch('/unfollowUser',{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                unfollowId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
           dispatch({
               type:"UPDATE",
               payload:{
                   following:data.following,
                   followers:data.followers
           }})
           localStorage.setItem("user",JSON.stringify(data))
           setuserProfile((prevState)=>{
               const newfollowers = prevState.user.followers.filter(item=>item !== data._id)
               return{
                   ...prevState,
                   user:{
                       ...prevState.user,
                       followers:newfollowers
                   }
               }
           })
           setfollowState(true)
       })
    }


    return(
        <>
        {
            userProfile ? 
                <div style={{maxWidth:"600px", margin:"0px auto"}}>
                    
                    <div className="profile-card">
                        <div>
                            <img alt="Sami" style={{width:"160px",height:"160px",borderRadius:"80px"}}
                            src="http://www.damodarcollege.edu.in/web/wp-content/uploads/2021/01/sample-photo1.jpg"/>
                        </div>
                        <div>
                            <h4>{userProfile.user.name} </h4>
                            <h6>{userProfile.user.email}
                            {
                                followState?<span><i className="material-icons" onClick={()=>followUser()} style={{float:"right",color:"green"}}>group_add</i></span>
                                :
                                <span><i className="material-icons" onClick={()=>unfollowUser()} style={{float:"right",color:"red"}}>clear</i></span>
                            }
                            </h6>
                            <div className="profile-info">
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item=>{
                                return(
                                    <img className="gallery-item" key={item._id} src={item.photo} alt={item.titile}/>
                                )
                            })
                        }    
                    </div>
                </div>
            :<h3>Loading Profile!!!!!!</h3>
        }
        
        </>
    )
}



export default Profile
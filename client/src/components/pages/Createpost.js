import React from 'react'

const CreatePost =()=>{
    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder ="title" />
            <input type="text" placeholder ="body" />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Select Image</span>
                    <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #ef5350 red lighten-1">Post</button>
        </div>

    )
}

export default CreatePost
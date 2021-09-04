import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { HomeContext } from "../home/HomeProvider"
import { UserContext } from "../user/UserProvider"
import './CreatePost.css'

export const CreatePost = () => {
    const { feed, getFeed, addToFeed } = useContext(HomeContext)
    const { users, getUsers} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({profileURL: "", name: ""})

    const history = useHistory()
    const currentUserId = sessionStorage.getItem("midea_user")

    useEffect(() => {getUsers()}, [])

    useEffect(() => {
        const currentUserObj = users.find(user => user.id === parseInt(currentUserId)) || {profileURL: "", name: ""}
        setCurrentUser(currentUserObj)
    }, [users])
    
    const [post, setPost] = useState({
        userId: parseInt(currentUserId),
        imageURL: "",
        time: Date(Date.now()).slice(0,24),
        caption: "",
        subject: "",
        source: ""
    })

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleCreatePost = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        if (post.imageURL === "" || post.caption === "" || post.subject === "" || post.source === "") {
            window.alert("Please add all the information")
        } else {
            const newPost = {
                userId: parseInt(currentUserId),
                imageURL: post.imageURL,
                time: Date(Date.now()).slice(0,15),
                caption: post.caption,
                subject: post.subject,
                source: post.source
            }
            addToFeed(newPost)
             .then(() => history.push("/me"))
    }}
    


    return (
        <>
        <div className="post">
            <div className="create_post_image">
                <input type="text" id="imageURL" className="create image" placeholder="Enter image URL" 
                value={post.imageURL} onChange={handleControlledInputChange}/>
            </div>
            <div className="create_post_info">
                <div className="post_source">
                    <input type="text" id="source" className="create source" placeholder="Enter source link" 
                    value={post.source} onChange={handleControlledInputChange}/>
                </div>

                <div className="post_subject">
                    <input type="text" id="subject" className="create subject" placeholder="Enter subject here" 
                    value={post.subject} onChange={handleControlledInputChange}/>
                </div>

                <div className="post_author_info">
                    <img className="account_profile" src={currentUser.profileURL} alt="account profile picture" />
                    <h3>{currentUser.name}</h3> 
                </div>
                
                <div className="post_caption">
                    <input type="text" id="caption" className="create caption" placeholder="Enter post caption" 
                    value={post.caption} onChange={handleControlledInputChange}/>
                </div>
                <button className="create_post_button" onClick={handleCreatePost}> Create Post</button>
            </div>
           
        </div>
    </>
    )
}
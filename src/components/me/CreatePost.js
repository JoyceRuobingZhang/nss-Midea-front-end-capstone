import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { HomeContext } from "../home/HomeProvider"
import { UserContext } from "../user/UserProvider"
// import { UploadImage } from "./UploadImage"
import './CreatePost.css'

export const CreatePost = () => {
    const { feed, getFeed, addToFeed, getPostById, updatePost } = useContext(HomeContext)
    const { users, getUsers} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({profileURL: "", name: ""})
    const [post, setPost] = useState({})

    const{ postId } = useParams()
    const history = useHistory()
    const currentUserId = sessionStorage.getItem("midea_user")

    useEffect(() => {getUsers()}, [])
    useEffect(() => {getFeed()}, [])

    useEffect(() => {
        const currentUserObj = users.find(user => user.id === parseInt(currentUserId)) || {profileURL: "", name: ""}
        setCurrentUser(currentUserObj)
    }, [users])
    

    useEffect(() => { 
        if(postId){
            getPostById(postId).then(post => setPost(post)) 
        } else {
            setPost({
                userId: parseInt(currentUserId),
                imageURL: "",
                time: Date(Date.now()).slice(0,24),
                caption: "",
                subject: "",
                source: ""
            })
        }
    }, [feed])


    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleCreatePost = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        if (post.imageURL === "" || post.caption === "" || post.subject === "" || post.source === "") {
            window.alert("Please add all the information")
        } else if (postId) {
            const newPost = {
                id: post.id,
                userId: parseInt(currentUserId),
                imageURL: post.imageURL,
                time: Date(Date.now()).slice(0,15),
                caption: post.caption,
                subject: post.subject,
                source: post.source
            }
            updatePost(newPost)
             .then(() => history.push(`/post/detail/${post.id}`))
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
        }
    }
    

    return (
        <>
        <div className="create_box">
            <div className="create_post_image">
                {
                    postId?
                    <>
                        <img className="defaultValue_image" src={post.imageURL}/>
                        <label>Update Image URL:   </label>
                        <input type="text" id="imageURL"  placeholder="Enter image URL"  className="create image_url_input"
                        value={post.imageURL} onChange={handleControlledInputChange} defaultValue={post.imageURL}/>
                    </>:
                    <>
                        <input type="text" id="imageURL" className="create image_url" placeholder="Enter image URL" 
                        value={post.imageURL} onChange={handleControlledInputChange} defaultValue={post.imageURL}/>
                    </>
                }
            </div>
            <div className="create_post_info">
                <div className="post_source"> Post Source:  
                    <input type="text" id="source" className="create source" placeholder="Enter source link" 
                    value={post.source} onChange={handleControlledInputChange} defaultValue={post.source} />
                </div>

                <div className="post_subject"> Post Subject:
                    <input type="text" id="subject" className="create subject" placeholder="Enter subject here" 
                    value={post.subject} onChange={handleControlledInputChange} defaultValue={post.subject} />
                </div>

                <div className="create_author_info">
                    <img className="account_profile" src={currentUser.profileURL} alt="account profile picture" />
                    <h3>{currentUser.name}</h3> 
                </div>
                
                <div className="create_post_caption"> Post Caption:
                    <textarea type="text" id="caption" className="create caption" placeholder="Enter post caption" 
                 onChange={handleControlledInputChange} defaultValue={post.caption}  />
                </div>
                <button className="create_post_button" onClick={handleCreatePost}> {postId ? <> Save Changes </> : <> Create Post </>}</button>
            </div>
        </div>
    </>
    )
}
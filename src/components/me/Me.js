import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HomeContext } from "../home/HomeProvider"
import { UserContext } from '../user/UserProvider'
import { FriendContext } from '../user/FriendProvider'
import { FavoriteContext } from "../user/FavoriteProvider";
import { Popup } from './Popup';
import Create from './create.png' 
import Delete from './delete.png'
import Edit from './edit.png'
import './Me.css'

export const Me = () => {

    // get current user name   // get following/follower  // get my favorite posts
    const {users, getUsers} = useContext(UserContext)
    const {feed, getFeed, deletePost} = useContext(HomeContext)
    const {friends, getFriends, unFollow } = useContext(FriendContext)
    const {favorites, getFavorites, removeFavorite} = useContext(FavoriteContext)

    const [currentUser, setCurrentUser] = useState({})
    const [followingArr, setFollowingArr] = useState([])
    const [followerArr, setFollowerArr] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const [tabContent, setTabContent] = useState(true); 


    useEffect(() => {getUsers()}, [])
    useEffect(() => {getFeed()}, [])
    useEffect(() => {getFriends()}, [])
    useEffect(() => {getFavorites()}, [])


    useEffect(() => {
        const currentUserId = sessionStorage.getItem("midea_user")
        const currentUserObj = users.find(user => user.id === parseInt(currentUserId)) || {}
        setCurrentUser(currentUserObj)

        const followingArr = friends.filter(friend => friend.currentUserId === parseInt(currentUserId)) 
        setFollowingArr(followingArr)

        const followerArr = friends.filter(friend => friend.userId === parseInt(currentUserId)) 
        setFollowerArr(followerArr)

        const myFavoritePosts = favorites.filter(favorite => favorite.userId === parseInt(currentUserId)) 
        setFavoritePosts(myFavoritePosts)

        const myPosts = feed.filter(post => post.userId === parseInt(currentUserId))
        setMyPosts(myPosts)
    }, [users, friends, favorites, feed])


    // for following/follower popup window
    const [followingIsOpen, setFollowingIsOpen] = useState(false);

    const followingTogglePopup = () => {
        setFollowingIsOpen(!followingIsOpen);
    }
    const [followerIsOpen, setFollowerIsOpen] = useState(false);

    const followerTogglePopup = () => {
        setFollowerIsOpen(!followerIsOpen);
    }

    // delete from favorite list
    const history= useHistory()
    const MySwal = withReactContent(Swal)

    const handleRemoveFavorite = (favoritePostId) => {
        removeFavorite(favoritePostId).then(history.push("/me"))
        MySwal.fire({ didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
        }}).then(() => { return MySwal.fire(<p>Successfully removed!</p>) })
    }

    // delete my post
    const handleDeletePost = (postId) => {
        deletePost(postId).then(() => history.push("/me"))
        setTabContent(false)
    }


    return (
        <>
        <div className="me">
            <div className="create_post">
                <Link to="/me/edit"><img className="create-icon" src={Create} alt="create post"/></Link>
                <span className="tiptext">create a new post</span>
            </div>
            <div className="me_profileImage">
                <img className="me_accountProfile" src={currentUser.profileURL}/>
            </div>
            <div className="me_name">
               {currentUser.name}
            </div>
            <div className="me_follow">
                <div className="following_section ">
                    <input className="following" type="button" value={`${followingArr.length} Following`} onClick={followingTogglePopup}/>
                    {followingIsOpen && 
                    <Popup content={
                            <ul className="following_accounts"> 
                            {followingArr.map(following => {
                                return (
                                    <li className="following_account">
                                        <div className="following_account_info">
                                            <img className="following_profile_images" src={following.user.profileURL} alt="account profile photo"/>
                                            <div className="following_name">{following.user.name}</div>
                                        </div>
                                        <button className="unfollow" onClick={() => {unFollow(following.id)}}>unfollow</button>
                                    </li>
                                )
                            })}
                            </ul>}
                            handleClose={followingTogglePopup}
                    />
                    }
                </div>
                <div className="follower_section">
                    <input className="follower" type="button" value={`${followerArr.length} Follower`} onClick={followerTogglePopup}/>
                    {followerIsOpen && <Popup content={
                            <ul>
                            {followerArr.length > 0 ? 
                            followerArr.map(follower => {
                                return (
                                    <li className="follower_account">
                                        <img className="follower_profile_images" src={follower.user.profileURL} alt="account profile photo"/>
                                        <div className="follower_name">{follower.user.name}</div>
                                    </li>
                                )
                            }) : <h3 className="follower_name">You don't have any followers yet...</h3>}
                            </ul>}
                            handleClose={followerTogglePopup}
                            />
                    }
                </div>
            </div>        

            <div class="tabs">
                <button class="tab" onClick={() => setTabContent(true)}>Favorites</button>
                <button class="tab" onClick={() => setTabContent(false)}>MyPosts</button>
            </div>
                {
                    tabContent? 
                        <div className="my_favorites">
                        {
                            favoritePosts.map(favoritePost => {
                                return (
                                    <div className="favorite_post">
                                        <Link key={favoritePost.id} to={`post/detail/${favoritePost.post.id}`}><img className="favorite_post_img" src={favoritePost.post.imageURL} alt="favorite post"/></Link>
                                        <button onClick={() => handleRemoveFavorite(favoritePost.id)}><img className="delete_icon" src={Delete} /></button>
                                    </div>
                                )
                            })
                        }
                        </div> :
                        <div className="my_posts">
                        {
                            myPosts.map(post => {
                                return (
                                    <div className="my_post">
                                        <Link key={post.id} to={`post/detail/${post.id}`}><img className="my_post_img" src={post.imageURL} alt="favorite post"/></Link>
                                        <div className="icons">
                                        <button onClick={() => handleDeletePost(post.id)}><img className="delete_icon" src={Delete} /></button>
                                        <button  onClick={() => history.push(`/me/edit/${post.id}`)}><img className="edit_icon" src={Edit} /></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                }
        </div>
        </>
    )
}


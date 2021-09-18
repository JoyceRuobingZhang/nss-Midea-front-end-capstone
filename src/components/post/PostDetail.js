import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HomeContext } from "../home/HomeProvider" 
import { FavoriteContext } from "../user/FavoriteProvider";
import { FriendContext } from "../user/FriendProvider";
import {Carousel} from '3d-react-carousal';
import Favorite from './favorite.png'
import Unfavorite from './favorited.png'
import { CommentList } from './CommentList'
import "./PostDetail.css"

export const PostDetail = () => {
    const { feed, getFeed } = useContext(HomeContext)
    const { friends, getFriends, follow, unFollow } = useContext(FriendContext)
    const { favorites, getFavorites, addFavorite, removeFavorite } = useContext(FavoriteContext)

    const [post, setPost] = useState({user: "", subject: ""})
    const [similarPosts, setSimilarPosts] = useState([])
    const [currentUserFavoritesArr, setCurrentUserFavoritesArr] = useState([])
    const [currentUserFriendsArr, setCurrentUserFriendsArr] = useState([])


    useEffect(() => {getFeed()}, [])
    useEffect(() => {getFriends()}, [])
    useEffect(() => {getFavorites()}, [])

    const {postId} = useParams()

    useEffect(() => {
        // find the specific post to show detail
        const thisPost = feed.find(eachPost => eachPost.id === parseInt(postId)) || {user: "", subject: "" } 
        setPost(thisPost)

        // find all the similar posts
        const theSimilarPosts = feed.filter(eachPost => eachPost.subject.includes(thisPost.subject)) 
        setSimilarPosts(theSimilarPosts)

        // find all the posts that are liked by the current user
        const currentUserId = sessionStorage.getItem("midea_user")

        const currentUserFavoritesArr = favorites.filter(favorite => favorite.userId === parseInt(currentUserId) )
        setCurrentUserFavoritesArr(currentUserFavoritesArr)

        const currentUserFriendsArr = friends.filter(friend => friend.currentUserId === parseInt(currentUserId) )
        setCurrentUserFriendsArr(currentUserFriendsArr)

    }, [postId, feed, favorites, friends])


    const slides = similarPosts.map(similarPost => {
        return (
            <Link key={similarPost.id} to={`/post/detail/${similarPost.id}`}>
            <img className="similar_post" src={similarPost.imageURL} key={similarPost.id} width="400px" height="300px"/>
            </Link>
        )
    })

    // favorite/unfavorite click functions
    const history = useHistory()
    const MySwal = withReactContent(Swal)
    const currentUserId = sessionStorage.getItem("midea_user")

    const handleFavorite = (postId) => {
        const favoriteObj = {
            userId: parseInt(currentUserId),
            postId: postId
        }
        addFavorite(favoriteObj).then(history.push(`/post/detail/${postId}`))
        MySwal.fire({ didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
        }}).then(() => { return MySwal.fire(<p>Added to your favorite list!</p>) })
    }

    const handleUnfavorite = (postId) => {
        const favoriteId = currentUserFavoritesArr.find(favoriteObj => favoriteObj.postId === postId).id
        removeFavorite(favoriteId).then(history.push(`/post/detail/${postId}`))
        MySwal.fire({ didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
        }}).then(() => { return MySwal.fire(<p> Removed from your favorite list!</p>) })
    }

    // follow/unFollow click functions
    const handleFollow = (userId) => {
        const friendObj = {
            userId: userId,
            currentUserId: parseInt(currentUserId)
        }
        follow(friendObj).then(history.push(`/post/detail/${postId}`))
        MySwal.fire({ didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
        }}).then(() => { return MySwal.fire(<p> Followed!</p>) })
    }

    const handleUnFollow = (userId) => {
        const friendId = currentUserFriendsArr.find(friendObj => friendObj.userId === userId).id
        unFollow(friendId).then(history.push(`/post/detail/${postId}`))
        MySwal.fire({ didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
        }}).then(() => { return MySwal.fire(<p> Unfollowed!</p>) })
    }


    return (
        <>
        <div className="post">
            <div className="post_image">
                <img className="the_post_image" src={post.imageURL} alt="post" width="600px" />
            </div>
            <div className="post_info">
                <div className="detail_top">
                <div className="favorite">
                    {   
                    currentUserFavoritesArr.some(currentUserFavoriteObj => currentUserFavoriteObj.postId === post.id)? 
                    <button onClick={() => handleUnfavorite(post.id)}><img className="iconButton favorite" src={Unfavorite} alt="favorite"/></button> :
                    <button onClick={() => handleFavorite(post.id)}><img className="iconButton favorite" src={Favorite} alt="favorite"/></button>
                    }
                    
                </div>
                <div className="post_source">
                    <h3 className="visit_source">Visit Site:</h3> 
                    <a className='source_link' href={post.source}>{post.source}</a>
                </div>
                </div>
                <div className="post_author_info">
                    <img className="account_profile" src={post.user.profileURL} alt="account profile picture" />
                    <h3 className="post_author_name">{post.user.name}</h3> 
                    {
                        currentUserFriendsArr.some(currentUserFriendsObj => currentUserFriendsObj.userId === post.user.id)?
                        <button className="follow" onClick={() => handleUnFollow(post.user.id)}>UnFollow</button>:
                        <button className="follow" onClick={() => handleFollow(post.user.id)}>Follow</button>
                    }
                </div>
                <div className="post_caption">
                    {post.caption}
                </div>
                <div className="post_time">
                    <small className="post_time">{post.time}</small>
                </div>
            </div>
        </div>

        <div className="post_comments">
            <CommentList postId={post.id} />
        </div>

        <div className="slider">
        <h3 className="similar_caption">You May Also Like:</h3>
        <Carousel slides={slides} autoplay={false} interval={1000}/>
        </div>
    </>
    )
}
import React from "react"
import { Route } from "react-router-dom"

import { Footer } from "./footer/Footer"
import { Navbar } from "./nav/Navbar"
import { UserProvider } from "./user/UserProvider"
import { HomeProvider } from "./home/HomeProvider"
import { FriendProvider } from "./user/FriendProvider"
import { FavoriteProvider } from "./user/FavoriteProvider"
import { HomeList } from "./home/HomeList"
import { PostDetail } from "./post/PostDetail"
import { Message } from "./message/Message"
import { Me } from "./me/Me"
import { CreatePost } from "./me/CreatePost"
import { CommentProvider } from "./post/CommentProvider"
import { CommentResponseProvider } from "./post/CommentResponseProvider"


export const ApplicationViews = () => {

    return (
        <>
        <UserProvider>
        <FriendProvider>
        <FavoriteProvider>
        <HomeProvider >
        <CommentProvider>
        <CommentResponseProvider>
            <Route exact path="/">
                <Navbar />
                <HomeList />
                {/* <Footer /> */}
            </Route>   

            <Route exact path="/post/detail/:postId(\d+)">
                <Navbar />
                <PostDetail />
            </Route>  

            <Route exact path="/me">
                <Navbar />
                <Me />
                <Message />
            </Route>   

            <Route exact path="/me/edit">
                <Navbar />
                <CreatePost />
            </Route>   
        
        </CommentResponseProvider>
        </CommentProvider>
        </HomeProvider>
        </FavoriteProvider>
        </FriendProvider>
        </UserProvider>
        </>
    )
    
}
import React from "react"
import { Route } from "react-router-dom"

import { Footer } from "./footer/Footer"
import { Navbar } from "./nav/Navbar"
import { UserProvider } from "./user/UserProvider"
import { HomeProvider } from "./home/HomeProvider"
import { FriendProvider } from "./user/FriendProvider"
import { FavoriteProvider } from "./user/FavoriteProvider"
import { CommentProvider } from "./post/CommentProvider"
import { CommentResponseProvider } from "./post/CommentResponseProvider"
import { HomeList } from "./home/HomeList"
import { PostDetail } from "./post/PostDetail"
import { CustomerService } from "./message/customerService"
import { Me } from "./me/Me"
import { CreatePost } from "./me/CreatePost"



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
                <CustomerService />
            </Route>   

            <Route exact path="/me/edit">
                <Navbar />
                <CreatePost />
            </Route>   

            <Route exact path="/me/edit/:postId(\d+)">
                <Navbar />
                <CreatePost />
            </Route>   

            <Route exact path="/messages">
                <Navbar />
                
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
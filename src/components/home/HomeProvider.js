import React, {createContext, useState } from 'react'


export const HomeContext = createContext()

export const HomeProvider = (props) =>{

    const [feed, setFeed] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    
    const getFeed = () => {
        return fetch("http://localhost:8000/posts?_expand=user")
        .then(response => response.json())
        .then(setFeed)
    }

    const addToFeed = (postObj) => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(getFeed)
    }

    const deletePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {method:"DELETE"})
        .then(getFeed)
    }

    const getPostById = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`)
        .then(response => response.json())
    }

    return (
        <HomeContext.Provider value={{feed, getFeed, searchTerms, setSearchTerms, addToFeed, deletePost, getPostById}}>
            {props.children}
        </HomeContext.Provider>
    )
}
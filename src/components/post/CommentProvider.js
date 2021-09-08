import React, {createContext, useState} from 'react'

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const apiURL = "http://localhost:8000"
    
    const getComments = () => {
        return fetch(`${apiURL}/comments?_expand=user&&_expand=post`)
        .then(res => res.json())
        .then(setComments)
    }

    const addComment = (commentObj) => {
        return fetch(`${apiURL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(res => res.json())
        .then(getComments)
    }

    const deleteComment = commentId => {
        return fetch(`${apiURL}/comments/${commentId}`, {
            method: "DELETE"     
        })
        .then(getComments)
    }

    const openReplyInput = commentId => {
        return fetch(`${apiURL}/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({replyInput: true})  
        })
        .then(getComments)
    }

    const closeReplyInput = commentId => {
        return fetch(`${apiURL}/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({replyInput: false})  
        })
        .then(getComments)
    }


    return (
        <CommentContext.Provider value={{comments, getComments, addComment, deleteComment, openReplyInput, closeReplyInput}}>
            {props.children}
        </CommentContext.Provider>
    )
}
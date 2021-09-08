import React, {createContext, useState} from 'react'

export const CommentResponseContext = createContext()

export const CommentResponseProvider = (props) => {
    const [commentResponses, setCommentResponses] = useState([])

    const apiURL = "http://localhost:8000"
    
    const getCommentResponses = () => {
        return fetch(`${apiURL}/commentResponses?_expand=user&&_expand=comment`)
        .then(res => res.json())
        .then(setCommentResponses)
    }

    const addCommentResponse = (commentResponseObj) => {
        return fetch(`${apiURL}/commentResponses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentResponseObj)
        })
        .then(res => res.json())
        .then(getCommentResponses)
    }

    const deleteCommentResponse = commentId => {
        return fetch(`${apiURL}/commentResponses/${commentId}`, {
            method: "DELETE"     
        })
        .then(getCommentResponses)
    }

    return (
        <CommentResponseContext.Provider value={{commentResponses, getCommentResponses, addCommentResponse, deleteCommentResponse}}>
            {props.children}
        </CommentResponseContext.Provider>
    )
}
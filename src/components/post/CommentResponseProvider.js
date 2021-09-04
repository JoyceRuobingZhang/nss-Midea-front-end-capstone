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

    return (
        <CommentResponseContext.Provider value={{commentResponses, getCommentResponses}}>
            {props.children}
        </CommentResponseContext.Provider>
    )
}
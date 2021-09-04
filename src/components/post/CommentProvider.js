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

    return (
        <CommentContext.Provider value={{comments, getComments}}>
            {props.children}
        </CommentContext.Provider>
    )
}
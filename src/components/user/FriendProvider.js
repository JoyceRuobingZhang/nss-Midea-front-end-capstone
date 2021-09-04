
import React, { createContext, useState } from "react"


export const FriendContext = createContext()

const apiURL = "http://localhost:8000"

export const FriendProvider = (props) => {
    const [friends, setFriends ] = useState([])
    
    const getFriends = () => {
        return fetch(`${apiURL}/friends?_expand=user`)
            .then(res => res.json())
            .then(setFriends)
    }

    const follow = (friendObj) => {
        return fetch(`${apiURL}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObj)
        })
        .then(getFriends)
    }
    const unFollow = (friendId) => {
        return fetch(`${apiURL}/friends/${friendId}`, {method: "DELETE"} )
        .then(getFriends)
    }

    return (
        <FriendContext.Provider value={
            { friends, getFriends, follow, unFollow }
        }>
            {props.children}
        </FriendContext.Provider>
    )
} 


import React, { createContext, useState } from "react"

export const FavoriteContext = createContext()

const apiURL = "http://localhost:8000"

export const FavoriteProvider = (props) => {
    const [favorites, setFavorites ] = useState([])
    
    const getFavorites = () => {
        return fetch(`${apiURL}/favorites?_expand=post`)
            .then(res => res.json())
            .then(setFavorites)
    }

    const addFavorite = (favoriteObj) => {
        return fetch(`${apiURL}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteObj)
        })
            .then(res => res.json())
            .then(getFavorites)
    }

    const removeFavorite = (favoritePostId) => {
        return fetch(`${apiURL}/favorites/${favoritePostId}`, {method: "DELETE"} )
        .then(getFavorites)
    }

    return (
        <FavoriteContext.Provider value={
            { favorites, getFavorites, addFavorite, removeFavorite }
        }>
            {props.children}
        </FavoriteContext.Provider>
    )
} 


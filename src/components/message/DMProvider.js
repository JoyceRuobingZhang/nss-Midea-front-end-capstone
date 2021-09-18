import React, {createContext, useState} from 'react'

export const DMContext = createContext()

export const DMProvider = (props) => {

    const [DMSearchTerms, setDMSearchTerms] = useState("")

    const [DMs, setDMs] = useState([])

    const apiURL = "http://localhost:8000"
    
    const getDMs = () => {
        return fetch(`${apiURL}/DMs?_expand=user`)
        .then(res => res.json())
        .then(setDMs)
    }

    const addDM = (DMObj) => {
        return fetch(`${apiURL}/DMs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DMObj)
        })
        .then(res => res.json())
        .then(getDMs)
    }

    return (
        <DMContext.Provider value={{DMs, getDMs, addDM, DMSearchTerms, setDMSearchTerms}}>
            {props.children}
        </DMContext.Provider>
    )
}
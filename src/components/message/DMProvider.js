import React, {createContext, useState} from 'react'

export const DMContext = createContext()

export const DMProvider = (props) => {

    const [DMSearchTerms, setDMSearchTerms] = useState("")

    const [DMs, setDMs] = useState([])

    // for notifications
    const [ totalUnreadNum, setTotalUnreadNum ] = useState("")

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

    const deleteDM = (DMId) => {
        return fetch(`http://localhost:8000/DMs/${DMId}`, {method:"DELETE"})
        .then(getDMs)
    }

    const markAsRead = DMId => {
        return fetch(`${apiURL}/DMs/${DMId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isRead: true})  
        })
        .then(getDMs)
    }

    return (
        <DMContext.Provider value={{DMs, getDMs, addDM, deleteDM, DMSearchTerms, setDMSearchTerms, totalUnreadNum, 
        setTotalUnreadNum, markAsRead }}>
            {props.children}
        </DMContext.Provider>
    )
}
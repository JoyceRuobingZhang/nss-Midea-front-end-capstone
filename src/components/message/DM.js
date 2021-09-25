import { useContext, useEffect, useState, useRef } from 'react';
import { DMContext } from './DMProvider';
import { UserContext } from '../user/UserProvider';
import Back from "./back.png"
import Send from "./send..png"
// import Delete from "/Users/ruobingz/workspace/midea/src/components/me/delete.png"

// 🔴🔴🔴 Polling
    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        });
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

export const DM = (props)  => {

    const { DMs, getDMs, addDM, deleteDM,DMSearchTerms, setDMSearchTerms, markAsRead } = useContext(DMContext)
    const { users, getUsers } = useContext(UserContext)
    const [ currentUserDMList, setCurrentUserDMList ] = useState([])
    const [ filteredDMs, setFilteredDMs ] = useState([])
    const [ filteredUsers, setFilteredUsers ] = useState([])
    const [ openPrivateChat, setOpenPrivateChat ] = useState("")
    const [ DM, setDM ] = useState({})


    // for the cover DMs
    const [ latestUserDMs, setLatestUserDMs ] = useState([])


    // useInterval(getDMs, 500, []) ?? not sure if this line is right...
    // useInterval(() => {getDMs()}, 500, [DMs])  * this line was working yesterday.


    useEffect(() => {getDMs()}, [])
    
    useEffect(() => {getUsers()}, [])

    useEffect(() => {setDMSearchTerms("")}, []) 

    useEffect(() => {
        if(DMSearchTerms !== ""){
            const searchedDMs = DMs.filter(DM => 
                DM.content.toLowerCase().includes(DMSearchTerms.toLowerCase()) ||
                DM.user.name.toLowerCase().includes(DMSearchTerms.toLowerCase())
            ) 
            setFilteredDMs(searchedDMs)

            const searchedUsers = users.filter(user => 
                user.name.toLowerCase().includes(DMSearchTerms.toLowerCase())
            ) 
            setFilteredUsers(searchedUsers)

        }else {
            setFilteredDMs(DMs)
        }
    }, [DMSearchTerms, DMs])


    useEffect(() => {
        const currentUserId = sessionStorage.getItem("midea_user")
        const currentUserDMList = filteredDMs.filter(DM => DM.currentUserId === parseInt(currentUserId))

        /*🔴🔴🔴 reduce to a new array of the latest DMs from different users
                to display the DM cover page    */
        const coverDMs =  currentUserDMList.reduce( (userDMs, DM) => {
            const existingUserDM = userDMs.find(dm => dm.userId === DM.userId)
            if( !existingUserDM ) {
                userDMs.push(DM)
            } else {
                if( new Date(DM.time) > new Date(existingUserDM.time)){
                    const replaceIndex = userDMs.findIndex(dm => dm.userId === DM.userId)
                    userDMs[replaceIndex] = DM
                }
            }
            return userDMs
        }, [])

        // sort the cover DMs from latest to oldest
        coverDMs.sort(function (a, b) {
            return  new Date(a.time) < new Date(b.time) ? 1 : -1 
        })

        setLatestUserDMs(coverDMs)

        setCurrentUserDMList(currentUserDMList)

    }, [filteredDMs, filteredUsers, openPrivateChat])



    // 🔴🔴🔴 private chat page
    const PrivateMessage = (props) => {
        const privateUserMessages = currentUserDMList.filter(DM => DM.userId === props.userId)

        const currentUserId = sessionStorage.getItem("midea_user")
        const myResponses = filteredDMs.filter(DM =>  DM.currentUserId === props.userId && DM.userId === parseInt(currentUserId))

        const conversation = privateUserMessages.concat(myResponses)
       

        conversation.sort(function (a, b) {
           return  new Date(a.time) > new Date(b.time) ? 1 : -1 
        })

        const handleControlledInputChange = e => {
            const newDM = { ...DM }
            newDM[e.target.name] = e.target.value
            setDM(newDM)
        }
    
        const sendDM = () => {
            const currentUserId = sessionStorage.getItem("midea_user")
    
            const DMObj = {
                userId: parseInt(currentUserId),
                currentUserId: props.userId,
                time: Date(Date.now()).slice(0,24),
                content: DM.content,
                isRead: false
            }
            addDM(DMObj)
            setDM({})
        }    
        // private chat returned result:
        return (
            <>
            <div className="private_header">
                <div className="private_info">
                    <img  src={props.userProfile} className="private_profile" /> 
                    <div className="private_name">{props.userName}</div>
                </div>
                <button onClick={() => setOpenPrivateChat("")}><img src={Back} className="back_icon" /></button>
            </div>

            <div className="conversation">
            {
                conversation.map(message => {
                    if(message.userId === props.userId){
                        return (
                        <div className="user_message">
                        <div>{message.content}</div>
                        <small>{message.time}</small>
                        </div>)
                    } else if (message.userId === parseInt(currentUserId)) {
                        return (
                        <div className="my_message">
                           <div>{message.content}</div>
                           <small>{message.time}</small>
                        </div>)
                    }
                })
            }
            </div>

            <div className="message_edit">
                <input type="text" className="message_input" name="content" placeholder="send a message ..."  
                value={DM.content} onChange={handleControlledInputChange} autoFocus />
                <img src={Send} className="send_DM_icon" onClick={sendDM} />
            </div>
            </>
        )
    }

    // const handleDeleteChat = (DMId) => {
    //     const coverDMsToBeDeleted = currentUserDMList.filter(DM => DM.id === DMId)
    //     coverDMsToBeDeleted.forEach(DM => deleteDM(DM.id))
    // }

    // 🔴🔴🔴 DM BOX returned result
    if(filteredUsers.length > 0){
        return (
          <div className="DM_box">
            <div className="DM_header">
                <div>🔍 <input type="text" className="DM_search" onKeyUp={e => setDMSearchTerms(e.target.value)} placeholder="search DM or user..." /></div>
                <button className="inbox" onClick={() => {
                    setFilteredUsers({})
                    setOpenPrivateChat("")
                    setDMSearchTerms("")
                }}> Inbox </button>
                <button className="close_DM" onClick={props.handleShow} >✖️</button>
            </div>
            <div>
                <ul className="searched_users">
                {
                filteredUsers.map(user => {
                    if(openPrivateChat === ""){
                    return (
                        <li className="searched_user">
                        <img  src={user.profileURL} className="searched_user_profile" /> 
                        <button className="searched_user_name" onClick={() => {
                            setOpenPrivateChat(user.id)
                            setDMSearchTerms("")
                        }}>{user.name}</button>
                        </li>
                    )} else if (openPrivateChat === user.id) {
                        return <PrivateMessage userId={user.id} userName={user.name} userProfile={user.profileURL} /> 
                    }
                })
                }
                </ul>
            </div>
          </div>

        )
    } else {
        return (
            <div className="DM_box">
                <div className="DM_header">
                    <div>🔍 <input type="text" className="DM_search" onKeyUp={e => setDMSearchTerms(e.target.value)} placeholder="search DM or user..." /></div>
                    <button className="inbox" onClick={() => setOpenPrivateChat("")} >Inbox</button>
                    <button className="close_DM" onClick={props.handleShow} >✖️</button>
                </div>

                <ul className="DMs">
                {
                    latestUserDMs.map(DM => {
                        if(openPrivateChat === ""){
                            return (
                                <div className="cover_DM">
                                <li className="DM">
                                    <a class="notification">
                                        <img  src={DM.user.profileURL} className="DM_profile" /> 
                                        <span class="badge">
                                        { currentUserDMList.filter(dm => dm.userId === DM.user.id ).filter(dm => dm.isRead === false).length > 0 ?
                                          currentUserDMList.filter(dm => dm.userId === DM.user.id ).filter(dm => dm.isRead === false).length:
                                          "" }
                                        </span>
                                    </a>
                                    <button className="DM_info" onClick={() => {
                                        setOpenPrivateChat(DM.user.id)
                                        currentUserDMList.filter(dm => dm.userId === DM.user.id ).map(dm => {markAsRead(dm.id)})
                                    }}>
                                            <div className="DM_user_name">{DM.user.name}</div>
                                            <small className="DM_preview">{DM.content.slice(0,35)}... </small>
                                    </button>
                                    
                                </li>
                                {/* <button><img className="delete_DM" src={Delete} onClick={() => handleDeleteChat(DM.id)} /></button> */}
                                </div> )
                        } else if (openPrivateChat === DM.user.id){
                            return <PrivateMessage userId={DM.user.id} userName={DM.user.name} userProfile={DM.user.profileURL} /> 
                        }
                    })
                }
                </ul>
                        
            </div>
        
        ) }
}

// props:  <PrivateMessage userId={userId}>  


  
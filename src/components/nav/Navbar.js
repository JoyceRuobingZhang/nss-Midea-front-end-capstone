import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { HomeContext } from "../home/HomeProvider"
import { DM } from "../message/DM"
import { DMContext } from "../message/DMProvider"
import Logo from './logo midea.png'
import Create from '../me/create.png'
import DMIcon from './DM.png'
import './Navbar.css'
import '../message/DM.css'


export const Navbar = () => {

  // log out
  const history = useHistory()

  const LogOut = () => {
        sessionStorage.removeItem("midea_user")
        history.push("/login")   
    }

  // navbar search
  const { setSearchTerms } = useContext(HomeContext)

  useEffect(() => {setSearchTerms("")}, []) 

  const [showDM, setShowDM] = useState(false)
  
  // DM popup / badge number count
  const handleShow = () => {
    setShowDM(!showDM)
  }
  const { DMs, getDMs, totalUnreadNum, setTotalUnreadNum } = useContext(DMContext)

  useEffect(() => {getDMs()}, [])

  useEffect(() => {
    const currentUserId = sessionStorage.getItem("midea_user")
    const currentUserDMList = DMs.filter(DM => DM.currentUserId === parseInt(currentUserId))
    const totalUnreadDMs = currentUserDMList.filter(DM => DM.isRead === false)
    setTotalUnreadNum(totalUnreadDMs.length)
  }, [DMs])


  return (
    <div className="nav_body">
    <nav className="navbar">
       <Link className="nav-link logo" to="/"><img className="logo" src={Logo} alt="logo"/>\</Link>
      <ul className="nav"> 
        <li className="nav-item home-search">
          <Link className="nav-link" to="/">
              <input className="search_input" type="text" placeholder="🔎" onKeyUp={e => setSearchTerms(e.target.value)} />
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/me/edit"><img className="create_icon" src={Create} /></Link>
        </li>   

        
        <li className="nav-item DM_icon">
          
            <button className="nav-link" onClick={handleShow}><img className="create_icon" src={DMIcon} /></button>
            <a class="notification">
            <span class="badge">{totalUnreadNum > 0 ? totalUnreadNum : ""}</span>
            </a>
        </li>
        

        <li className="nav-item">
          <Link className="nav-link" to="/me">Me</Link>
        </li>

        <li className="nav-item">
          <button className="nav-link logout" onClick={LogOut} >LogOut</button>
        </li>
      </ul>
    </nav>

    {
      showDM? <DM handleShow={handleShow} /> : ""
    }

    </div>
  )
}


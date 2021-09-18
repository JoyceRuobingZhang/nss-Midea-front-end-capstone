import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HomeContext } from "../home/HomeProvider"
import MyImage from './logoholder.png'
import Create from '../me/create.png'
import DMIcon from './DM.png'
import './Navbar.css'
import '../message/DM.css'
import { DM } from "../message/DM"



export const Navbar = () => {

  const { setSearchTerms } = useContext(HomeContext)

  useEffect(() => {setSearchTerms("")}, []) 

  const [showDM, setShowDM] = useState(false)
  
  const handleShow = () => {
    setShowDM(!showDM)
  }

  return (
    <div className="nav_body">
    <nav className="navbar">
       <Link className="nav-link logo" to="/"><img className="logo" src={MyImage} alt="logo"/>\</Link>
      <ul className="nav"> 
        <li className="nav-item home-search">
          <Link className="nav-link" to="/">
              <input className="search_input" type="text" placeholder="🔎" onKeyUp={e => setSearchTerms(e.target.value)} />
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/me/edit"><img className="create_icon" src={Create} /></Link>
        </li>   

        <li className="nav-item notification">
          <button className="nav-link" onClick={handleShow}><img className="create_icon" src={DMIcon} /></button>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/me">Me</Link>
        </li>
      </ul>
    </nav>

    {
      showDM? <DM handleShow={handleShow} /> : ""
    }

    </div>
  )
}


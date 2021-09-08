import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { HomeContext } from "../home/HomeProvider"
import MyImage from './logoholder.png'
import './Navbar.css'

export const Navbar = () => {

  const { setSearchTerms } = useContext(HomeContext)

  useEffect(() => {setSearchTerms("")}, []) 

  return (
    <nav className="navbar">
       <Link className="nav-link logo" to="/"><img className="logo" src={MyImage} alt="logo"/>\</Link>
      <ul className="nav"> 
        <li className="nav-item home-search">
          <Link className="nav-link" to="/">
              <input className="search_input" type="text" placeholder="🔎" onKeyUp={e => setSearchTerms(e.target.value)} />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/me">Me</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messages">Messages</Link>
        </li>   
      </ul>
    </nav>
  )
}


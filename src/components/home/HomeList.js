import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeContext } from './HomeProvider'
import Filter from "./filter.png"
import './Home.css'


export const HomeList = () => {
    const {feed, getFeed, searchTerms} = useContext(HomeContext)
    const [ filteredFeed, setFilteredFeed ] = useState([])

    const { setSearchTerms } = useContext(HomeContext)
    useEffect(() => {setSearchTerms("")}, []) 

    useEffect(() => {getFeed()}, [])
    
    useEffect(() => {
        if(searchTerms !== ""){
            const searchedFeed = feed.filter(post => post.subject.toLowerCase().includes(searchTerms.toLowerCase())) 
            setFilteredFeed(searchedFeed)
        }else {
            setFilteredFeed(feed)
        }
    }, [searchTerms, feed])

    
    const cardSizes = ["card_small", "card_medium", "card_large"]

    function shuffle(filteredFeed) {
        var j, x, i;
        for (i = filteredFeed.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = filteredFeed[i];
            filteredFeed[i] = filteredFeed[j];
            filteredFeed[j] = x;
        }
        return filteredFeed;
    }

    return (
        <>
         <div className="filters">
            <img src={Filter} className="filter_icon"/>
            <button className="filter_keyword all" onClick={() => setSearchTerms("")}>All</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("food")}>Food</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("home")}>Home</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("travel")}>Travel</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("pet")}>Pet</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("electronics")}>Electronics</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("car")}>Car</button>
            <button className="filter_keyword" onClick={() => setSearchTerms("wedding")}>Wedding</button>
        </div>

         <div className="home-grid-container"> 
            {
                shuffle(filteredFeed).map(post => {
                    return (
                        <div className={`card ${cardSizes[(Math.floor(Math.random() * 2))]}`} key={post.id}>
                            <img className="card-image" src={post.imageURL} alt="post"/>
                                <Link className="image-caption" to={`/post/detail/${post.id}`} key={post.id}>SEE DETAILS</Link>
                        </div>
                    
                    )
                })
            }
        </div>
        
        </>
   )
}


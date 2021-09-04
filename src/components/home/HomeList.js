import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeContext } from './HomeProvider'
import './Home.css'


export const HomeList = () => {
    const {feed, getFeed, searchTerms} = useContext(HomeContext)
    const [ filteredFeed, setFilteredFeed ] = useState([])

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


import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from '../../MovieCard'
import './Trending.css'
import CustomPagination from '../../Pagination/CustomPagination.js'

// Trending page 


function Trending() {
    const [page,setPage] = useState(1);
    const [content,setContent] = useState([])

    //fetching the trending data from the movie database api.

    const getTrending = async () =>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=82365f96e5fbb7cab7fb0e0331f4416f&page=${page}`);
    
        setContent(data.results);  
    }

    // useEffect to call my async function

    useEffect(() => {
        getTrending();
        // eslint-disable-next-line
    }, [page])

    // movie card template layout with the trending data recieved from api

    return (<div>
        <h1 className='section-title'>🔥 Trending 🔥</h1>
        <div className='trending'>
           {content && content.map((c) => <MovieCard
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            rating={c.vote_average}
            media={c.media_type}
            release={c.release_date || c.first_air_date}
            vote={c.vote_average}
            />
            
            )};
        </div>
        <CustomPagination setPage={setPage}  numOfPages='10' />
        </div>
    )
}


export default Trending 

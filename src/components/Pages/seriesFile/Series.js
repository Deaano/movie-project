import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../MovieCard';
import CustomPagination from '../../Pagination/CustomPagination.js';

// Series page 

function Series() {    
    const [page, setPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState();
    const [content,setContent] = useState([]);

    // fetching tv series data from movie database api

    const getSeries = async () => {
        
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/tv?api_key=82365f96e5fbb7cab7fb0e0331f4416f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
      
        setContent(data.results);
        setNumOfPage(data.total_pages);
        
    }

    // useEffect to call my async function

    useEffect(() => {
        getSeries();
        // eslint-disable-next-line
    }, [page]); 
    
    // movie card template layout with the tv series data recieved from api

    return (
    <div>
            <h1 className='section-title'>📺 Series 📺</h1>
       
        <div className='movies'>
            {content && content.map((c) => <MovieCard
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            rating={c.vote_average}
            media='Series'
            release={c.release_date || c.first_air_date}
            vote={c.vote_average}/>
            )}
        </div>
        <div>
        <CustomPagination setPage={setPage} numOfPage={numOfPage}/>
        </div>

    </div>
    )
}


export default Series
 
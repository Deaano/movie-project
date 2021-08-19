import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../MovieCard'
import './Movies.css';
import CustomPagination from '../../Pagination/CustomPagination.js'

// Movie Page

function Movies() {

    //set page to default 1 with a number of pages set to the data recieved from api.
    const [page, setPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState();

    // content variable used to store the data recieved from api
    const [content,setContent] = useState([]);

    // fetching movies from movie database api

    const getMovies = async () => {
        
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=82365f96e5fbb7cab7fb0e0331f4416f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
      
        setContent(data.results);
        setNumOfPage(data.total_pages);
        
    }

    // useEffect used to call getMovies functon with a value of page

    useEffect(() => {
        getMovies();
        // eslint-disable-next-line
    }, [page]); 
    
    

    return (
    <div>
        <h1 className='section-title'>🎬 Movies 🎬</h1>
       
        <div className='movies'>
            {content && content.map((c) => <MovieCard
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            rating={c.vote_average}
            media='movie'
            release={c.release_date || c.first_air_date}
            vote={c.vote_average}/>)}
        </div>
        
        <div>
        <CustomPagination setPage={setPage} numOfPage={numOfPage}/>
        </div>

    </div>
    
)}


export default Movies

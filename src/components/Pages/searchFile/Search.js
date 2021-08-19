import { Button, Tab } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import axios from "axios"
import { useEffect, useState } from "react";
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { Tabs } from "@material-ui/core";
import MovieCard from "../../MovieCard";
import CustomPagination from "../../Pagination/CustomPagination";

// Search Movies

function Search() {    

    // value state for switching from movie to series tabs
    const [value, setValue] = useState(0);

    const [numOfPage, setNumOfPage] = useState(0);
    const [page, setPage] = useState(1);

    // texted thats inserted into api address from the input that was searched
    const [searchedText, setSearchedText] = useState('');
    
    //type of search either movie or series
    const [type, setType] = useState(0);
    const [content, setContent] = useState([]);
   
    //fetching data from movie database depending on the query searched and the movie type

    const getSearch = async () => {
    try{
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/search/${ type ? "tv" : "movie" }?api_key=82365f96e5fbb7cab7fb0e0331f4416f&language=en-US&query=${searchedText}&page=${page}`);
    
        setContent(data.results)

        setNumOfPage(data.total_pages);

    } catch (error) {
        console.log(error)
    }
}

//Calling the search function wit page and type as values, which will be called again if changed.

useEffect(() => {
   getSearch();
   // eslint-disable-next-line 
}, [page,type])

    return(
    <div>
   <div className='search-container'>
   
   <TextField 
   style={{width:'80vw', 
    marginTop:'20px', 
    marginLeft:'25px',
    marginBottom:'25px'}} 
   color='secondary' 
    onChange={(p) => setSearchedText(p.target.value)}
   label='Search' 
   variant='filled'
    onKeyDown={(event) => {
    if(event.key === 'Enter'){
        getSearch();
        event.preventDefault();
    }}} >
   </TextField>
   
   <Button
   style={{height:'56.5px', marginTop:'20px'}} onClick={getSearch}>
   <SearchIcon /> 
   </Button>
</div>

    <div className='tabs'>
    <Tabs
        style={{ flex:1 }}
        value={value}
        onChange={(event,newValue) => {
            setType(newValue);
            setPage(1);
            setValue(newValue);
        }}
        indicatorColor="secondary"
        textColor="secondary">
        
        <Tab 
        label="Search Movies" 
        style={{ width:'50%', margin:'15px 0',padding:' 0  20px ' }}/>
        
        <Tab 
        label="Search Series" 
        style={{ width:'50%', margin:'15px 0',padding:' 10px 0' }}/>
        
    </Tabs>
    
    </div>
    
       <div className='movies'>
            {content && content.map((c) => 
            <MovieCard
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            rating={c.vote_average}
            media={type ? "tv" : "movie"}
            release={c.release_date || c.first_air_date}
            vote={c.vote_average}
            />)}
        </div>
    <div>
        <CustomPagination setPage={setPage} numOfPage={numOfPage}/>
    </div>
</div>

)}

export default Search


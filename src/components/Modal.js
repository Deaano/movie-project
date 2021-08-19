import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable } from '../config/config';
import './Modal.css'
import { Button } from '@material-ui/core';
import  YouTubeIcon  from '@material-ui/icons/YouTube'

// modal styles 

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:'0.9',
  },
  paper: {
    width:'63.5%',
    Height:'85vh',
    backgroundColor:'purple',
    color:'white',
    borderRadius:'10px',
    opacity:'0.8',
    padding:'8px'
  },
}));

// the children,media and id brought over from movieCard.js

export default function ContentModal({children , media , id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
 
 //open modal function

  const handleOpen = () => {
    setOpen(true);
  };

  // close modal function

  const handleClose = () => {
    setOpen(false);
  };

  // fetch modal data depending on if the type is a movie or a tv series. 

  const fetchData = async() => {

    const { data } = await axios.get(`
    https://api.themoviedb.org/3/${media === 'movie' ? 'movie':'tv'}/${id}?api_key=82365f96e5fbb7cab7fb0e0331f4416f&language=en-US&&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
  
        setContent( data )    
}

  // useEffect to call my async function

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

  return (

    // adding the children content of the modal tag that is wrapped around the movieCard template. 

    <div>
      <div onClick={handleOpen} className='movie-card'>
       {children}
      </div>
      
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

        // modal content
      >
        <Fade in={open}>

        {content && (  
          <div className={classes.paper}>
           <div className='modal'>
            <img  className='modal-poster' alt="cover" src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} />
            <div className='title-and-content-container'>
            <h2 className='modal-title'>{content.title || content.name}</h2>
             <p className='modal-content'>{content.overview}</p>
             
             <Button 
               variant='contained' 
               startIcon={ <YouTubeIcon /> }
               color='secondary'
               target='__blank'
               href={`https://www.youtube.com/results?search_query=${content.title ||content.name}+trailer`}
               style={{
               backgroundColor:'red',
               marginTop:'15px',
               marginBottom:'10px',
               width:'100%',
               fontSize:'0.7rem'}}>Watch Trailer On Youtube</Button>
             </div>
          </div>
       </div>  
       )} 

        </Fade>
      </Modal>
    </div>
  );
}
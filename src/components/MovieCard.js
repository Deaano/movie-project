import React from 'react';
import './MovieCard.css'
import { img_300, unavailable, } from '../config/config'
import { Badge} from '@material-ui/core'
import ContentModal from './Modal';

// Movie Card Template

function MovieCard(c) {
    
    return (
        
     <ContentModal media={c.media} id={c.id}>
        
        <Badge badgeContent={c.vote} color={'secondary'} style={{zIndex:0}} />

        <div className='movie-img-box'>
            <img alt='movie-poster' className='movie-image' src={c.poster ? `${img_300}/${c.poster}` : unavailable} />
        </div>
            <h3 className='title'>{c.title}</h3>
        <div className='type-release'>
            <span className='movie-type'>{c.media}</span>
            <span className='release'>{c.release}</span>
        </div>    
        
    </ContentModal>
            
    
    )}

export default MovieCard

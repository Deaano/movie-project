import React from 'react';
import { Pagination } from '@material-ui/lab';
import './CustomPagination.css'

// pagination used to set the page count of the data/content recieved 


function CustomPagination({setPage , numOfPage = 10}) {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };

    return (
        <div className='pagination'>
            <Pagination color='secondary' count={numOfPage} onChange={(e) => handlePageChange(e.target.textContent)}  
                hideNextButton
                hidePrevButton
                
            />
        </div>
    )
}

export default CustomPagination

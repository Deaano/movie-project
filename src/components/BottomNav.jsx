import React, { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

// bottom nav styles

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position:'fixed',
    bottom:0,
    backgroundColor:'rgb(70, 2, 70)',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // useHistory() to push the page address if the value/page is changed.

  const History = useHistory();
  
  useEffect(() => {
   if(value === 0)History.push('/');
   else if(value === 1)History.push('/Movies');
   else if(value === 2)History.push('/Series');
   else if (value === 3)History.push('/Search');
   // eslint-disable-next-line
 }, [value])

  return (

    // bottom nav

    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction 
      style={{color:'white'}} 
      label="Trending" 
      icon={<WhatshotIcon />} />
      
      <BottomNavigationAction 
      style={{color:'white'}} 
      label="Movies" 
      icon={<MovieIcon />} />
      
      <BottomNavigationAction 
      style={{color:'white'}} 
      label="Series" 
      icon={<TvIcon />} />
      
      <BottomNavigationAction 
      style={{color:'white'}} 
      label="Search" 
      icon={<SearchIcon />} />
    
    </BottomNavigation>
  );
}
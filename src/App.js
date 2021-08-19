import './App.css';
import React from 'react';
import Header from './components/Header/Header.jsx';
import SimpleBottomNavigation from './components/BottomNav.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trending from './components/Pages/trendingFile/Trending'
import Movies from './components/Pages/moviesFile/Movies'
import Series from './components/Pages/seriesFile/Series'
import Search from './components/Pages/searchFile/Search'

// using react-router-dom to make the 4 different pages i need for my movie app

function App() {
  return (
    <BrowserRouter>
    
    <Header />
    
    <div className="app">
    <Switch>
    <Route path='/' component={Trending} exact />
    <Route path='/Movies' component={Movies} />
    <Route path='/Series' component={Series} />
    <Route path='/Search' component={Search} />
    </Switch>

    <SimpleBottomNavigation />
    </div>

    </BrowserRouter>
)}

export default App;

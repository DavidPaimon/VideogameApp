import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios"
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateVg from "./components/CreateVg/CreateVg";
import DetailVg from "./components/DetailVg/DetailVg";
import About from './components/About/About';

axios.defaults.baseURL = "https://pi-videogames-main-production-51e1.up.railway.app/";

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/create'>
          <CreateVg />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/videogame/:id'>
          <DetailVg />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
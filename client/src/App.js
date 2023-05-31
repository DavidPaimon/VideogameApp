//Esta es la app es sí misma
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import Detail from './components/Detail';
import GamesNames from './components/GamesNames';
import About from './components/About';



const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          <Route path= '/home' component={Home}/>
          <Route path= '/createGame' component={CreateGame}/>
          <Route path= '/detail/:id' component={Detail}/>
          <Route path="/name" component={GamesNames}/>
          <Route path="/about" component={About}/>
        <h1>GAME APP</h1>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
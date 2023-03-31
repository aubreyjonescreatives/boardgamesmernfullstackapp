import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Welcome from './scenes/Welcome'
import PopularGames from './scenes/PopularGames'; 
import TopNavigation from "./components/TopNavigation"; 
//import { CSSTransition } from 'react-transition-group'



function App() {
 
  return (
   <Router>
       <TopNavigation/>
       <Route path='/' exact component={Welcome}/>
     <Route path='/populargame' exact component={PopularGames}/>
   </Router>

  )

}

export default App;

import React from 'react';
import { NavLink } from 'react-router-dom'
import './css/cardStyles.css'
import { Container, Navbar } from 'react-bootstrap'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import logo from './assets/images/chaoticneutralgameslogo.png'







function TopNavigation() {
 

return (
  
  <div>
   
   <Container className="nav-container">
  <Navbar expand="lg" variant="light" bg="light" className="navBar">
  <NavLink activeClassName="activeLink" to ='/' className="navLink">Chaotic Neutral Games</NavLink>
  <NavLink activeClassName="activeLink" to="/populargame" className="navLink">Popular Games</NavLink>
    
  </Navbar>
</Container>
   
   
    </div>

)

}

export default TopNavigation; 
  
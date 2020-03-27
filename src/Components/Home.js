
import React from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Link } from "react-router-dom"
//this page should have the option to login or signup
//should have two buttons.
const Home = () => {
  // const handleLogin = () => {
  //   console.log('hi')
  // }
  return(
  <div id="center" style={{height: "200px",  position: "relative"}} align="center">
      {/* <NavBar/> */}
     <h1 id="header" align="center">vibe diem</h1> 
  
       <Link to="/login">Login</Link> <br/>
       <Link to="/signup">Sign Up</Link> <br/>
  </div>
);
}
export default Home;


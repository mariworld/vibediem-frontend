import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return(
    <ul className="nav" margin="0">
     <ul>
        <button><NavLink to="/">Home</NavLink></button>
      </ul>
     <ul>
        <button><NavLink to="/login">Vibe In</NavLink></button>
      </ul>
     <ul>
     <button> <NavLink to="/signup">Vibe Up</NavLink></button>
      </ul>
     <ul>
     <button><NavLink to="/crib">Crib</NavLink></button>
      </ul>
    </ul>
  )
};

export default NavBar;
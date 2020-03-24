  
import React from 'react';
//this page should have the option to login or signup
//should have two buttons.
const Home = () => {
  const handleLogin = () => {
    console.log('hi')
  }
  return(
  <div>
    <h1 id="header">Vibe Diem</h1>
      <button onClick={handleLogin}>Login</button>
      <button>SignUp</button>
  </div>
);
}
export default Home;
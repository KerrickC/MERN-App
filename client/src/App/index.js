import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Login from '../pages/login'



function App() {

   const [loggedIn, setLogged] = useState(false)



  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Query App</h1>
      </header>
      {loggedIn ?
        <Cards />
        :
        <Login setLogged={setLogged}  />
      }
    </div>
  );
}

export default App;

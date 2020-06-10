import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Login from '../pages/login'
import axios from 'axios'
import './App.css'

const baseURL = 'http://localhost:3004/api'

const App = (props) => {


  const [loggedIn, setLogged] = useState(false)

  const tok = localStorage.getItem('token')

  useEffect(() => {
    //console.log(tok)
    axios.post(baseURL + '/refresh', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if(res.status == 200){
        setLogged(true)
        console.log('success')
        localStorage.setItem('token', res.data.data)
      }else{
        console.log('logged out1')
        setLogged(false)
        localStorage.removeItem('token')
      }
    }).catch((err) => {
      if (err) {
        console.log(err)
        setLogged(false)
        localStorage.removeItem('token')
      }
    })
  }, [])


  const logout = () => {
    if(tok){
      localStorage.removeItem('token')
    }
    setLogged(false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Test App</h1>
        <button onClick={logout} >Logout</button>
      </header>
      {/* if loggedIn state is true, show cards, else show login */}
      {/* Does not protect database - still accessible without authentication (jwt) */}
      {loggedIn ?
        <Cards /> : <Login setLogged={setLogged} />
      }
    </div>
  );
}

export default App;

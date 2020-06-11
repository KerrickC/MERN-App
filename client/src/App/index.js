import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Login from "../pages/login";
import axios from "axios";
import "./App.css";
import Decode from "jwt-decode";

const baseURL = "http://localhost:3000/api";

const App = (props) => {
  const [loggedIn, setLogged] = useState(false);
  const [user, setUser] = useState("");

  const tok = localStorage.getItem("token");

  useEffect(() => {
    //console.log(tok)
    axios
      .post(baseURL + "/refresh", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLogged(true);
          const decodeToken = Decode(res.data.data);
          setUser(decodeToken.username);
          console.log("success");
          localStorage.setItem("token", res.data.data);
        } else {
          console.log("logged out1");
          setLogged(false);
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setLogged(false);
          localStorage.removeItem("token");
        }
      });
  }, []);

  const logout = () => {
    if (tok) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } else {
      console.log("You are not currently signed in or something went wrong");
    }
    setLogged(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="app-title">Test App</h1>
        <button onClick={logout}>Logout</button>
      </header>
      {loggedIn ? (
        <Cards className="cards" user={user} />
      ) : (
        <Login setUser={setUser} setLogged={setLogged} />
      )}
    </div>
  );
};

export default App;

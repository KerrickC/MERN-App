import React from "react";
import { useState } from "react";
import axios from "axios";
import Decode from "jwt-decode";
import "../components/styles/Cards.css";

const baseURL = "http://localhost:3004/api";

const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = (event) => {
    const loginToJson = {
      username: username,
      password: password,
    };
    event.preventDefault();

    alert("Authenticaiton happening");
    axios
      .post(baseURL + "/authenticate", loginToJson)
      .then((res) => {
        if (res.status === 200) {
          console.log(Decode(res.data.token));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.username);
          props.setUser(res.data.username);
          props.setLogged(true);
          alert("success");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error1");
      });
  };

  return (
    <form className="login-comp" onSubmit={onSubmit}>
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <div classNamel="ogin-field">
          <p>Username</p>
          <input
            onChange={(e) => setusername(e.target.value)}
            type="text"
            name="username"
            placeholder="username"
            value={username}
            className="login-field"
          />
          <p>Password</p>
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            value={password}
            className="login-field"
          />
        </div>
        <input id="login-button" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Login;

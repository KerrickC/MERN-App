import React, {Component}from 'react'
import{ useState } from 'react';
import axios from 'axios'
import jwtDecode from 'jwt-decode'


const baseURL =  'http://localhost:3003/api'


const Login = (props) => {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const onSubmit = (event) => {
        console.log(event)

        const loginToJson = {
            'username' : username,
            'password' : password
        }
        event.preventDefault()


        alert('Authenticaiton happening')
        axios.post(baseURL + '/authenticate',loginToJson)
        .then(res => {
            console.log(res)
            if(res.status === 200) {
                alert('success')
                props.setLogged(true)
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
            alert('Error1')
        })
    }


    return(
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <input onChange={e => setusername(e.target.value)} type="text" name="username" placeholder="username" value={username}/>
            <input onChange={e => setpassword(e.target.value)} type="password" name="password" placeholder="password" value={password}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default Login
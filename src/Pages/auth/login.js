import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useCookies} from 'react-cookie';
import { useNavigate} from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const [_,setCookies] = useCookies(["access_token"])

    const navigate = useNavigate();

    const onSubmit = async (event) =>{
        event.preventDefault()
        try{
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })
            console.log(result.data.token)
            setCookies("access_token", result.data.token)
            window.localStorage.setItem("userId", result.data.userId);
            navigate("/")
        }catch(err){
            console.error(err)  // set error color to red
        }
    }
  return (
    <div>
        <h2> Login </h2>
        <div className='form-group'>
            <label htmlFor='username'> Username: </label>
            <input type="text" id='username' value={username} onChange={(event)=> setUsername(event.target.value)} />
        </div>
        <div className='form-group'>
            <label htmlFor='password'> Password: </label>
            <input type="password" id='password' value={password} onChange={(event)=> setPassword(event.target.value)} />
        </div>

        <button type='submit' onClick={onSubmit}> Submit </button>
    </div>
  )
}

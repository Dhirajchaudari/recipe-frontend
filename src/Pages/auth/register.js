import axios from 'axios';
import React from 'react'
import { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const onSubmit = async (event) =>{
        event.preventDefault()
        try{
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            })
            alert("User register Successfully..")
        }catch(err){
            console.error(err)
        }
    }
  return (
    <div>
        <form>
            <h2> Register </h2>
            <div className='form-group'>
                <label htmlFor='username'> Username: </label>
                <input type="text" id="username" value={username} onChange={(event)=>{setUsername(event.target.value)}} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'> Password: </label>
                <input type="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
            </div>
            <button type='submit' onClick={onSubmit}>Submit</button>
        </form>
    </div>
  )
}

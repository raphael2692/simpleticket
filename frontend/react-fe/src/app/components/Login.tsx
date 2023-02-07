
import React, { useState } from 'react';
import AuthService from '../axios/AuthService';

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (event:any) => { // event: di default è il primo argomento
        event.preventDefault() // evita il refresh
        console.log("usernme and password passed:")
        console.log(username, password)
        AuthService.login(username, password)
    }
    return (
        <form onSubmit={ handleSubmit}>
            <fieldset>
                <legend>Login form</legend>
                <p>
                    <label htmlFor="username">username</label>
                    <input id="username" name="username" value = { username} onChange  = { e => setUsername(e.target.value) }type="text" />
                </p>
                <p>
                    <label htmlFor="">password</label>
                    <input id="password" name="password" value = { password } onChange  = { e => setPassword(e.target.value) } type="text" />
                </p>
                <button type="submit" name="submit" value="Save">Login</button>
            </fieldset>
        </form>
    )
}
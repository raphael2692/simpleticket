
import React, { useState, useEffect } from 'react';
import AuthService from '../axios/AuthService';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, store } from '../store';

import {sessionReducer} from '../redux/slicers/SessionSlice'

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const authService = new AuthService();
    const dispatch = useDispatch()
    const sessionUser = useSelector((state: RootState) => state.session);

    useEffect(
        () => {
            console.log("test")
            console.log(sessionUser)
            // console.log(store.getState().session)
        },
        [sessionUser])


    const handleSubmit = (event: any) => { // event: di default è il primo argomento
        event.preventDefault() // evita il refresh
        console.log("usernme and password passed:")
        console.log(username, password)

        authService.login(username, password)
            .then(
                (res) => dispatch(sessionReducer.actions.setSessionData(res))
            )
        // console.log(sessionData)
        // dispatch(authSlice.actions.setSessionData(sessionData))
        // dispatch(authSlice.actions.setSession(loginThunk(loginParams)))

        // authService.login(username, password)
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Login form</legend>
                <p>
                    <label htmlFor="username">username</label>
                    <input id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} type="text" />
                </p>
                <p>
                    <label htmlFor="">password</label>
                    <input id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} type="text" />
                </p>
                <button type="submit" name="submit" value="Save">Login</button>
            </fieldset>
        </form>
    )
}
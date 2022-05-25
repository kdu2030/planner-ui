import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

type LoginOptions = {
    setUserData: () => void;
}
//{ setUserData }: LoginOptions

//TODO Update Signup and Forgot your password links

function Login() {
    return (
        <div className="Login">
            <TopBar />
            <Card sx={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <form id="login-form">
                    <h2>Login</h2>
                    <TextField type="email" name="email" label="Email" variant="standard" sx={{width: "90%"}} />
                    <br />
                    <TextField type="password" name="password" label="Password" variant="standard"  sx={{width: "90%", marginTop: "20px"}} />
                    <br />
                    <Button variant="contained" sx={{ marginTop: "20px" }}>Log In</Button>
                    <p className={'small-text'}><Link to="/forgot">Forgot your password?</Link></p>
                    <p className={'small-text'}>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
                </form>
            </Card>
        </div>
    )
}

export default Login;
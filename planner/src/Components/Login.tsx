import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

type LoginOptions = {
    setUserData: () => void;
}
//{ setUserData }: LoginOptions

//TODO Update Signup and Forgot your password links

function Login() {
    return (
        <div className="Login">
            <Card sx={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <form id="login-form">
                    <h2>Login</h2>
                    <TextField type="email" name="email" label="Email" variant="standard" sx={{width: "90%"}} />
                    <br />
                    <TextField type="password" name="password" label="Password" variant="standard"  sx={{width: "90%", marginTop: "20px"}} />
                    <br />
                    <Button variant="contained" sx={{ marginTop: "20px" }}>Log In</Button>
                    <p className={'small-text'}><a href="#">Forgot your password?</a></p>
                    <p className={'small-text'}>Don't have an account? <a href="#">Sign up here.</a></p>
                </form>
            </Card>
        </div>
    )
}

export default Login;
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

function Signup() {
    return (
        <div className="Signup">
            <TopBar />
            <Card sx={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <form id="login-form">
                    <h2>Sign Up</h2>
                    <TextField id="firstName" type="text" name="firstName" label="First Name" variant="standard" required sx={{marginRight: "20px"}}/>
                    <TextField type="text" name="lastName" label="Last Name" variant="standard" required/>
                    <br/>
                    <TextField type="email" name="email" label="Email" variant="standard" required sx={{width: "90%"}} />
                    <br />
                    <TextField type="password" name="password" label="Password" variant="standard"  sx={{width: "90%"}} required />
                    <br />
                    <TextField type="password" name="password" label="Confirm Password" variant="standard"  sx={{width: "90%"}} required />
                    <br />
                    <Button variant="contained">Sign Up</Button>
                    <p className={'small-text'}>Already have an account? <Link to="/">Login here.</Link></p>
                </form>
            </Card>
        </div>
    )
}

export default Signup;
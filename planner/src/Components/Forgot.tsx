import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';


//TODO Update Signup and Forgot your password links

function Forgot() {
    return (
        <div className="Forgot">
            <TopBar />
            <Card sx={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <form id="login-form">
                    <h2>Forgot Your Password?</h2>
                    <TextField type="email" name="email" label="Email" variant="standard" sx={{width: "90%"}} required />
                    <Button variant="contained" id="forgot">Reset Password</Button>
                </form>
            </Card>
        </div>
    )
}

export default Forgot;
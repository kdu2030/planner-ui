import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

type VerifyProps = {
    email: string;
}

function Verify({email}: VerifyProps) {
    return (
        <div className="Verify">
            <TopBar />
            <Card sx={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="verify-text">
                    <h3>Verify your Email</h3>
                    <p>To use Backpack, we need you to verify your email.</p>
                    <p><strong>{`We sent an email to ${email}`}</strong></p>
                    <p>Click on the link in the email to verify your account.</p>
                    <Button variant="contained">Resend Email</Button>
                </div>
            </Card>
        </div>
    )
}

export default Verify;
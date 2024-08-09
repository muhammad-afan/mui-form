import { Box, Button, FormGroup, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from 'react'
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (e) => {
        setEmail(e.target.value)
        setErrorMsg(null)
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // email send
            navigate('/')
        })
        .catch((error) => {
            setErrorMsg(error.message)
            console.log(error)
        })

    }
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-50px' }}>
                <Paper sx={{ padding: '30px', width: '395px', margin: '-21px 13px 0px 16px' }} elevation={6}>
                    <Typography variant='h3' gutterBottom>Reset Password</Typography>
                    <FormGroup>

                        <Grid container>
                            <form action="" onSubmit={handleSubmit}>
                                <Grid item sx={{ margin: '0 auto' }}>
                                    <TextField
                                        label='Email'
                                        type='email'
                                        required
                                        error={errorMsg}
                                        helperText={errorMsg === "Firebase: Error (auth/missing-email)." ? 'Please Enter Email' : errorMsg === 'Firebase: Error (auth/user-not-found).' ? 'User Not Found' : null}
                                        value={email}
                                        onChange={handleChange}
                                        variant='standard'
                                        sx={{
                                            marginBottom: '25px',
                                            marginTop: '10px',
                                            width: '250px',
                                            position: 'relative',
                                            left: '25px'
                                        }}
                                        placeholder='Enter email'
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
                                        }}
                                    />
                                <Button type='submit' variant="contained" sx={{ marginTop: '23px', width: '100px', marginLeft: '40px' }} >Reset</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </FormGroup>
                </Paper>
            </Box>
        </div>
    )
}

export default ResetPassword

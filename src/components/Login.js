import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    Link as MUILink,
    IconButton
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useReducer } from 'react'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import reducer, { ACTIONS, initialState } from '../reducer';


const Login = ({ handleTabChange }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, state.EmailValue, state.PassValue)
            .then((_auth) => {
                navigate('/')
            })
            .catch(error => {
                dispatch({ type: ACTIONS.ERR_MSG, payload: error.message})
            })
    }

    return (
        <Box sx={{ margin: '-20px -38px' }}>
            <Paper sx={{ padding: '30px', width: '395px', margin: '-21px 13px 0px 16px' }} elevation={0}>
                <Typography variant='h3' gutterBottom>Login</Typography>
                <FormGroup>

                    <Grid container>
                        <form action="" onSubmit={handleSubmit}>
                            <Grid item sx={{ margin: '0 auto' }}>
                                <TextField
                                    label='Email'
                                    type='email'
                                    autoComplete='username'
                                    error={state.ErrMsg === 'Firebase: Error (auth/user-not-found).'}
                                    helperText={state.ErrMsg === 'Firebase: Error (auth/user-not-found).' ? 'Incorrect Email' : null}
                                    value={state.EmailValue}
                                    required
                                    onChange={((e) => dispatch({ type: ACTIONS.EMAIL_VALUE, payload: e.target.value }))}
                                    variant='standard'
                                    sx={{
                                        marginBottom: '25px',
                                        marginTop: '10px',
                                        width: '80%',
                                        position: 'relative',
                                        left: '-25px'
                                    }}
                                    placeholder='Enter email'
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'><EmailIcon color={state.Valid ? 'success' : 'default'} /></InputAdornment>
                                    }}
                                />
                                <TextField
                                    label='Password'
                                    value={state.PassValue}
                                    autoComplete="current-password"
                                    required
                                    onChange={((e) => dispatch({ type: ACTIONS.PASS_VALUE, payload: e.target.value }))}
                                    error={state.ErrMsg === 'Firebase: Error (auth/wrong-password).'}
                                    helperText={state.ErrMsg === 'Firebase: Error (auth/wrong-password).' ? 'Incorrect Password' : state.PassValue.length ? 'Do not share password with anyone' : ''}
                                    type={state.PasswordVisible ? 'text' : 'password'}
                                    fullWidth variant='standard'
                                    placeholder='Enter password'
                                    sx={{
                                        marginBottom: '25px',
                                        marginTop: '10px',
                                        width: '80%',
                                        position: 'relative',
                                        left: '-25px'
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'><LockIcon color={state.PassValue.length >= 5 ? 'success' : 'default'} /></InputAdornment>,
                                        endAdornment: <InputAdornment
                                            position='start'
                                        >
                                            <IconButton
                                                sx={{ position: 'absolute', right: '0px' }}
                                                onClick={(() => dispatch({ type: ACTIONS.PASS_VISIBLE }))}
                                            >
                                                {state.PassValue ? state.PasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon /> : null}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                                <Stack direction={'row'}>
                                    <FormControlLabel sx={{ position: 'relative', left: '15px' }} control={<Checkbox />} label="Remember me" />
                                    <MUILink
                                        sx={{
                                            position: 'relative',
                                            left: '70px',
                                            top: '8px',
                                            cursor: 'pointer'
                                        }}
                                        underline='hover'
                                        onClick={() => { navigate('/forgot-password') }}
                                    >
                                        Forgot Password?
                                    </MUILink>
                                </Stack>
                                <Stack direction={'row'} top={'8px'} position={'relative'} left={'16px'}>
                                    <Typography variant='body1'>Don't have an account? &nbsp;</Typography>
                                    <MUILink href='#' onClick={() => handleTabChange("event", '2')} underline='hover'>Create one</MUILink>
                                </Stack>
                                <Button type='submit' variant="contained" sx={{ marginTop: '23px', width: '100px' }}>Login</Button>
                            </Grid>
                        </form>
                    </Grid>
                </FormGroup>
            </Paper>
        </Box>
    )
}

export default Login
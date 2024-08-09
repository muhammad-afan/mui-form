import {
    Box,
    Button,
    FormGroup,
    Grid,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    Link,
    IconButton
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useReducer } from 'react'
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import reducer, { ACTIONS, initialState } from '../reducer';

const Signup = ({ handleTabChange }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, state.EmailValue, state.PassValue)
            .then((authUser) => {
                if (auth) {
                    navigate('/')
                }
            })
            .catch((error) => {
                dispatch({ type: ACTIONS.ERR_MSG, payload: error.message })
                console.log(error.message)
            })
    }

    return (
        <Box sx={{ margin: '-20px -38px' }}>
            <Paper sx={{ padding: '30px', width: '395px', margin: '-21px 13px 0px 16px' }} elevation={0}>
                <Typography variant='h3' gutterBottom>Signup</Typography>
                <FormGroup>
                    <Grid container>
                        <form action="" onSubmit={handleSubmit}>
                            <Grid item sx={{ margin: '0 auto' }}>
                                <TextField
                                    label='Email'
                                    type='email'
                                    value={state.EmailValue}
                                    error={state.ErrMsg === 'Firebase: Error (auth/email-already-in-use).'}
                                    helperText={state.ErrMsg === 'Firebase: Error (auth/email-already-in-use).' ? 'Email already in use' : null}
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
                                    required
                                    onChange={((e) => dispatch({ type: ACTIONS.PASS_VALUE, payload: e.target.value }))}
                                    error={state.ErrMsg === 'Firebase: Password should be at least 6 characters (auth/weak-password).'}
                                    helperText={state.ErrMsg === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? 'Password must contain at least 6 characters' : state.PassValue.length ? 'Do not share password with anyone' : ''}
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
                                        startAdornment: <InputAdornment position='start'><LockIcon color={(state.PassValue === state.ConPassValue) && (state.PassValue.length >= 5) ? 'success' : 'default'} /></InputAdornment>,
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
                                <TextField
                                    label='Enter Password again'
                                    value={state.ConPassValue}
                                    tabIndex={3}
                                    required
                                    onChange={((e) => dispatch({ type: ACTIONS.CON_PASS_VALUE, payload: e.target.value }))}
                                    // helperText={confirmpassvalue.length ? 'Do not share password with anyone' : ''}
                                    type={state.ConPasswordVisible ? 'text' : 'password'}
                                    fullWidth
                                    variant='standard'
                                    placeholder='Enter password'
                                    sx={{
                                        marginBottom: '25px',
                                        marginTop: '10px',
                                        width: '80%',
                                        position: 'relative',
                                        left: '-25px'
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'><LockIcon color={(state.PassValue === state.ConPassValue) && (state.ConPassValue.length >= 5) ? 'success' : 'default'} /></InputAdornment>,
                                        endAdornment: <InputAdornment
                                            position='start'
                                        >
                                            <IconButton
                                                sx={{ position: 'absolute', right: '0px' }}
                                                onClick={(() => dispatch({ type: ACTIONS.CON_PASS_VISIBLE }))}
                                            >
                                                {state.ConPassValue ? state.ConPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon /> : null}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                                <Stack direction={'row'}>
                                    <Typography variant='body1'
                                        sx={{
                                            position: 'relative',
                                            left: '17px',
                                            top: '2px'
                                        }}>Already have an account</Typography>
                                    <Link
                                        onClick={() => handleTabChange("event", '1')}
                                        href='#'
                                        sx={{
                                            position: 'relative',
                                            left: '24px',
                                            top: '1.5px'
                                        }}
                                        underline='hover'
                                    >
                                        Login?</Link>
                                </Stack>
                                <Button type='submit' variant="contained" sx={{ marginTop: '13px' }}>Signup</Button>
                                {/* <HoverButton/> */}
                            </Grid>
                        </form>
                    </Grid>
                </FormGroup>
            </Paper>
        </Box>
    )
}

export default Signup
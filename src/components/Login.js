import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);

  const handleRememberMeChange = (e) => setRemember(e.target.checked);
  const storedToken = localStorage.getItem("authToken");
  if(storedToken) navigate('/dashboard');

  useEffect(() => {
    userRef.current && userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = await login({ user, pwd }).unwrap();
      console.log("User Data:", userData);
      console.log("Remember Me:", remember);
  
      dispatch(setCredentials({ ...userData, user, remember }));
      setUser('');
      setPwd('');
      navigate('/dashboard');
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg('Aucune réponse du serveur');
      } else if (err.originalStatus === 400) {
        setErrMsg('Nom d\'utilisateur ou mot de passe manquant');
      } else if (err.originalStatus === 401) {
        setErrMsg('Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        setErrMsg('Échec de la connexion');
      }
      errRef.current && errRef.current.focus();
    }
  };
  

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <Container component="main" maxWidth="xs" sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Mot de passe"
            type="password"
            onChange={handlePwdInput}
            value={pwd}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" onChange={handleRememberMeChange} />}
            label="Se souvenir de moi"
          />

          <Typography variant="body2" color="error">
            {errMsg}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'black',
                  },
                }}
              >
                Mot de passe oublié ?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

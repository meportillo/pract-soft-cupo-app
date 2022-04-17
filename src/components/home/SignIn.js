import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
const theme = createTheme();
    
export default function SignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        if (email.trim() === "miguel@gmail.com" && password.trim() === "1234") {
            setError(false);
            console.log("logueado");
        }
        else {
            setError(true);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    {
                        error ? <Alert  severity="error" onClose={() => {setError(false)}}>Correo electronico o passaword incorretos</Alert> : <></>
                    }
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box 
                    noValidate sx={{ mt: 1 }} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                     }} 
                    >
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Direccion de Correo Electronico"
                        autoFocus
                        onChange={(e) => handleChangeEmail(e)}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type="password"
                        onChange={(e) => handleChangePassword(e)}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                        >
                        Ingresar 
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
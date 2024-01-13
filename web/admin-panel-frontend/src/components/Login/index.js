import { useState } from 'react'
import { styles } from './styles'
import { Alert, Box, Button, Grid, Input, InputLabel, Snackbar, TextField, Typography } from '@mui/material'

const SnackBarMessage = ({showSnackbar,handleClose,message})=>{
    return (
    <Snackbar 
        open={showSnackbar}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
    >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
    )
}

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("")
    const [showSnackbar,setShowSnackbar] = useState();

    const handleClose = ()=>{
        setShowSnackbar(false);
        setError("")
    }

    const handleSubmit = async()=>{
        if(email.length===0 || password.length===0){
            setError(" Empty Fields ")
            showSnackbar(true);
            return;
        }else {
            const response = await fetch("https://rjpoliceleftshift.onrender.com/")
        }
    }
    
  return (
    <Grid sx={styles.loginContainer}>
        {
            showSnackbar &&
            <SnackBarMessage 
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
                handleClose={handleClose}
                message={error}
            />
        }
        <Box sx={styles.loginBox}>
            <Typography
                fontFamily={"Ubuntu"}
                fontSize={"25px"}
                mb={"20px"}
            >
                Login
            </Typography>
            <Box sx={styles.loginFormInput}>
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    required 
                />
            </Box>
            <Box sx={styles.loginFormInput}>
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    required     
                />
            </Box>
            <Button sx={styles.loginButton} variant='contained' onClick={handleSubmit} >
                Admin Login
            </Button>
        </Box>    
    </Grid>
  )
}

export default Login
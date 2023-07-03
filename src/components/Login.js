import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Home.css"
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = "https://mynotebook-vinay-eipr.onrender.com";
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API call
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged In Successfully", "success")
            navigate('/myNoteBook');   // used to redirect  
        }
        else {
            props.showAlert(json.error, "error")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {

        setShowPassword(!showPassword);
    }


    return (

        <div>
            <div className="container mt-5 addnotes">
                <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/myNoteBook" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                <h2 style={{ fontWeight: "bold" }}>Login</h2>

                <div className="d-flex justify-content-center my-5">
                    <Button size="sal" className="mb-4 me-4" variant="contained" color="primary" startIcon={<FacebookIcon />} component={Link} to="/notfound" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Facebook</Button>
                    <Button size="large" className="mb-4" variant="contained" color="error" startIcon={<GoogleIcon />} component={Link} to="/notfound" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Google</Button>
                </div>

                <p className="mb-4 d-flex justify-content-center"> or Login with Email and Password</p>

                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <TextField variant="outlined" color="secondary" type="email" label="Email" id="email" name="email" onChange={onChange} value={credentials.email} fullWidth />
                    </div>

                    <div className="mb-4">
                        <TextField  type={showPassword ? 'text' : 'password'} variant="outlined" color="secondary"  label="Password" id="password" name="password" onChange={onChange} value={credentials.password} fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" key="password-toggle">
                                        <IconButton onClick={handleShowPassword} aria-label="toggle password visibility" edge="end" >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                    <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} >Login</Button>
                </form>
                <p> Don't have an account? <Link to="/myNoteBook/signup">signup</Link> </p>
            </div>
        </div>

    )
}

export default Login

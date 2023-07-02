import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import avatar from "../images/avataaars.png"
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const host = "http://localhost:3001";
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // for checking password with confirm password
    const [error, setError] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API call
        const url = `${host}/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');   // used to redirect   
            props.showAlert("Account created Successfully", "success")

        } else {
            props.showAlert("Invalid Credentials", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if(e.target.name === 'password' || e.target.name === 'cpassword')
        {
            validatePassword();
        }
            
    }

    const handleShowPassword = () => {

        setShowPassword(!showPassword);
    }

    const validatePassword = () => {
        if(credentials.password !== credentials.cpassword)
        {
            setError(true);
            seterrorMessage('Passwords does not match')
        }
        else{
            setError(false);
            seterrorMessage('');
        }
    }

    return (

        <div>
            <div className="d-flex">
                <div className="col-md-5">
                    <img src={avatar} alt="signin" className="img-fluid" style={{ width: "100%", height: "85vh", objectFit: "cover" }} />
                </div>

                <div className="col-md-7 ps-5 pe-5 pt-5" >
                    <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                    <h2 style={{ fontWeight: "Bold" }}>Create a new account</h2>
                    <p className="mb-4">Use your email to create a new account</p>

                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <TextField color="secondary" label="Username" variant="outlined" fullWidth type="text" id="name" name="name" onChange={onChange} value={credentials.name} required />
                        </div>

                        <div className="mb-4">
                            <TextField color="secondary" label="Email" variant="outlined" fullWidth type="email" id="email" name="email" onChange={onChange} value={credentials.email} required />
                        </div>

                        <div className="mb-4">
                            <TextField color="secondary" label="Password" variant="outlined" fullWidth type={showPassword ? 'text' : 'password'} id="password" name="password" onChange={onChange} value={credentials.password} required
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

                        <div className="mb-4">
                            <TextField color="secondary" label="Confirm Password" variant="outlined" fullWidth type="password" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} required 
                            error={error} helperText={errorMessage}
                            />
                        </div>

                        <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Signup</Button>
                    </form>

                    <p>Have an account? <Link to="/login">login</Link></p>

                </div>

            </div>
        </div>

    )
}

export default Signup


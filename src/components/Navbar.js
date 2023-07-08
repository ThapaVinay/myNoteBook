import React from 'react'
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { Button } from '@mui/material';

const Navbar = (props) => {

    // gives the current location, which location of the website the user is 
    let location = useLocation();

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.showAlert('GoodBye :(', 'info');
        navigate('/myNoteBook/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink activeclassname="active" className="navbar-brand" to="/myNoteBook" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem" }}>myNoteBook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/myNoteBook" ? "active" : ""}`} aria-current="page" to="myNoteBook/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/myNoteBook/about" ? "active" : ""}`} to="myNoteBook/about" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>About</Link>
                            </li>
                        </ul>

                        {!localStorage.getItem('token') ? 
                        <form className="d-flex">
                            <Button variant="outlined" color="secondary" className="nav-item" component={Link} to="myNoteBook/login" role="button" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }} >Login</Button>
                            <Button variant="outlined" color="secondary" className="nav-item ms-2" component={Link} to="myNoteBook/signup" role="button" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Sign Up</Button>
                        </form> : 
                        <Button onClick={handleLogout} color = "secondary" variant="outlined" className='nav-item ms-2' style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>LogOut</Button>}

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
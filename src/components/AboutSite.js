import React from 'react'
import '../styles/about.css';
import awesome from '../images/about - awesome.jpeg'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import About from '../components/About'

function AboutSite() {
    return (
        <div style={{ marginTop: "30px" }}>
            <div className="text-white aboutImg text-center">
                <div className="note-img me-3">
                    <h1 className="display-4">myNoteBook</h1>
                    <p>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee</p>
                </div>
            </div>

            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Why use <span style={{ color: "#9C27B0" }}>myNoteBook</span> </h2>
                        <p>iNotebook is made from the pain of writing all the things in notebook which is very hectic :(, So we mad an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.
                            you can also access your notes anywhere in your world, at anytime time . So dont forget to Create note because creating anything is always important
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <Button component={Link} to="/myNoteBook" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <img className="img-fluid" src={awesome} alt="about-awesome" />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <hr style={{ width: "500px", marginTop: '50px', height: "3px", backgroundColor: "grey" }} />
            </div>

            <h2 style={{ fontWeight: "bold", display: "flex", justifyContent: "center", marginTop: "20px" }}>Made By</h2>
            <div className="login">
                <About />
            </div>

        </div>
    )
}

export default AboutSite

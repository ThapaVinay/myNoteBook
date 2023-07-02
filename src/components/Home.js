import React from 'react'
import { Button } from '@mui/material'
import noteImg from '../images/inotebook.svg'
import {Link} from 'react-router-dom'
import Notes from './Notes'
import "../styles/Home.css"

export default function Home(props) {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <h1 className='display-2 pt-5 ps-3 ' ><span style={{ color: "#9C27B0" }}>my</span>NoteBook</h1>
                        <p className='ps-3' style={{ fontSize: "1.7rem", fontWeight: "bold" }}> Your notebook on cloud - safe and secure</p>
                        <p className='ps-3 mt-3' style={{ fontSize: "1rem", }}> An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.</p>

                        {/* add note button */}
                        <div className="d-flex mt-4 justify-content-center">
                            <Button component={Link} to="/myNoteBook/notes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
                        </div>
                    </div>

                    <div className="col-md-7 d-flex flex-column align-items-end">
                        <img src={noteImg} style={{ width: "75%" }} alt="myNoteBook" className="img-fluid" />
                    </div>
                </div>

                <Notes showAlert = {props.showAlert}/>
            </div>
        </>

    )
}

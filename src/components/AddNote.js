import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import "../styles/Home.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault(); // stops the page from reloading
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });  // it is to clean the field after submitting
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-4 addnotes">

            <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/myNoteBook" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
            <h2 style={{ fontWeight: "bold" }}>Add new note</h2>
            <p className="mb-4">Add a new note with your info and tag</p>

            <form>
                <div className="title mb-4">
                    <TextField type="text" label="Title" id="title" value={note.title} name="title" onChange={onChange} color="secondary" variant="outlined" fullWidth required/>
                </div>
                <div className="mb-4">
                    <TextField type="text" label="Description" id="description" name="description" value={note.description} onChange={onChange} color="secondary" variant="outlined" fullWidth required/>
                </div>
                <div className="mb-4">
                    <TextField type="text" label="Tags" id="tag" value={note.tag} name="tag" onChange={onChange} color="secondary" variant="outlined" fullWidth />
                </div>

                <Button size="large" fullWidth disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="mb-4" onClick={handleClick} variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Add Note</Button>
            </form>

        </div>

    )
}

export default AddNote

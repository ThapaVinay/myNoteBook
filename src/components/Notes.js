import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import empty from '../images/empty.svg'
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/myNoteBook/login');
            props.showAlert("You need to login or Signin first", "warning");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        setOpen(true);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [open, setOpen] = useState(false);  // it is used to open and close dialog

    const handleClick = (e) => {
        e.preventDefault(); // stops the page from reloading

        editNote(note.id, note.etitle, note.edescription, note.etag);
        setOpen(false);
        props.showAlert("Updated Successfully", "success");

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClose = (e) => {
        setOpen(false);
    };

    return (
        <>
            <div className="col-md-4 mt-2 mb-2">
                <Dialog open={open}>
                    <DialogTitle style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", fontSize: "2rem", paddingBottom: "0rem" }}> Edit Note</DialogTitle>

                    <form>
                        <DialogContent style={{ paddingTop: "0.5rem" }}>
                            <DialogContentText style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", marginBottom: "0.5rem" }}>
                                Edit the field that you want to edit in your note
                            </DialogContentText>

                            <TextField type="text" autoFocus color="secondary" margin="dense" required label="Title" id="etitle" value={note.etitle} name="etitle" onChange={onChange} fullWidth variant="standard" />
                            <TextField type="text" autoFocus color="secondary" margin="dense" required label="Description" id="edescription" name="edescription" value={note.edescription} onChange={onChange} fullWidth variant='standard' />
                            <TextField type="text" autoFocus color="secondary" margin="dense" label="Tags" id="etag" name="etag" value={note.etag} onChange={onChange} fullWidth variant='standard' />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1rem" }} >Cancel</Button>
                            <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} variant="contained" color="secondary" type="submit" onClick={handleClick} style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1rem" }}>Update Note</Button>
                        </DialogActions>

                    </form>
                </Dialog>
            </div>

            <div className="row ps-3 mb-1" style={{marginTop:"100px"}}>
                <h1 className='display-7'>Your notes:</h1>

                {/* display when there are no notes */}
                {notes.length === 0 &&
                    <div className="d-flex">
                        <p style={{ position: "absolute", left: "35%", marginTop: "50px" }}>Create your first note :) !!!!!</p>
                        <img src={empty} alt="empty" className="img-fluid ms-5 mt-3" style={{ width: "30%", opacity: "0.5" }} />
                    </div>
                }

                {console.log(notes)}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}

            </div>
        </>
    )
}

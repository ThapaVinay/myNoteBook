import React from 'react'
import noteContext from "../context/notes/noteContext"
import { useContext } from 'react'
import { IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;

    return (
        <div className='col-md-4 mt-2 mb-2'>
            <div className="card">
                <div className="card-body">

                    {/* title */}
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <IconButton color="secondary" className="mb-2 ms-auto" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "warning"); }}>
                            <DeleteOutlineOutlinedIcon color="secondary" />
                        </IconButton>
                        <IconButton color="secondary" className="mb-2" onClick={() => { updateNote(note) }}>
                            <EditIcon color="secondary" />
                        </IconButton>
                    </div>

                    {/* tag */}
                    <h6 className="card-subtitle mb-2 text-muted">
                        {note.tag[0] === '#' ? note.tag : `#${note.tag}`}
                    </h6>

                    {/* description */}
                    <p className="card-text">{note.description.slice(0,200)} ... </p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem;

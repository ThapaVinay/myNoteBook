import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes} = context;

    useEffect(() =>{
        getNotes();
         // eslint-disable-next-line
    },[])

    return (
        <>
            <AddNote />
            <div className="row my-4">
                <h1>Your notes</h1>

                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}

            </div>
        </>
    )
}

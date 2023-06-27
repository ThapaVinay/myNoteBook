import React from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;

    return (
        <div className="row my-4">
            <h1>Your notes</h1>

            {notes.map((note) => {
                return <NoteItem note={note}/>;
            })}

        </div>
    )
}

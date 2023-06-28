import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:3001";

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getNotes = async () => {

        // API call
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmMyMTFhZTRjNjE0MmNlMzg4YTU5In0sImlhdCI6MTY4NzQ0NzQzNH0.3ME5fgpKRT_RmyddcOSQzxaxJK9i-6ipvFnZeRT3_kc"
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // add a note
    const addNote = async (title, description, tag) => {
        //API CALL
        const url = `${host}/api/notes/addnote`;
        const data = { title, description, tag };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmMyMTFhZTRjNjE0MmNlMzg4YTU5In0sImlhdCI6MTY4NzQ0NzQzNH0.3ME5fgpKRT_RmyddcOSQzxaxJK9i-6ipvFnZeRT3_kc"
            },
            body: JSON.stringify(data),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // delete a note
    const deleteNote = async (id) => {
        // API call
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmMyMTFhZTRjNjE0MmNlMzg4YTU5In0sImlhdCI6MTY4NzQ0NzQzNH0.3ME5fgpKRT_RmyddcOSQzxaxJK9i-6ipvFnZeRT3_kc"
            },
        });
        const json = await response.json();
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {

        // API call
        const url = `${host}/api/notes/updatenote/${id}`;
        const data = { title, description, tag };
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmMyMTFhZTRjNjE0MmNlMzg4YTU5In0sImlhdCI6MTY4NzQ0NzQzNH0.3ME5fgpKRT_RmyddcOSQzxaxJK9i-6ipvFnZeRT3_kc"
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();

        // we cannot directly change the state in react
        let newNotes = JSON.parse(JSON.stringify(notes));  // makes an independent deep copy

        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;











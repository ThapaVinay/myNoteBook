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
        const json = await response.json();
        console.log(json);

        // function for the client
        console.log("Adding a new note");
        const note = {
            "_id": "6495339978bf892b6468ed94",
            "user": "6492c211ae4c6142ce388a59",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-23T05:54:33.732Z",
            "__v": 0
        };
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
        const json = response.json();
        console.log(json);

        console.log("deleting with id :", id);
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
        const json = response.json();
        console.log(json);

        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;











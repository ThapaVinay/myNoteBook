import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6495339978bf892b6468ed94",
            "user": "6492c211ae4c6142ce388a59",
            "title": "My Title",
            "description": "My first description",
            "tag": "personal",
            "date": "2023-06-23T05:54:33.732Z",
            "__v": 0
        },
        {
            "_id": "649a6093293b7f0aea6fc3fb",
            "user": "6492c211ae4c6142ce388a59",
            "title": "My Title 2",
            "description": "My first description 2",
            "tag": "personal",
            "date": "2023-06-27T04:07:47.651Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
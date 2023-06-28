const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')

// ROUTE 1 : Get all the notes Using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    // getting all the notes through user id received from the fetchUser function
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
})


// ROUTE 2 : Add a note Using : POST "/api/notes/addnote". Login required

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();

            res.json(note);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!");
        }

    })


// ROUTE 3 : Update an existing note Using : PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {

        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        if (!note) {
            res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // new : true creates new node if the node is not there
        res.json({ note });
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }

})


// ROUTE 4 : Delete an existing note Using : DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        // Find the note to be deleted and delete it

        let note = await Note.findById(req.params.id);

        if (!note) {
            res.status(404).send("Not found");
        }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been delete", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
})

module.exports = router;


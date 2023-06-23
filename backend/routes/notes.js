const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')

// ROUTE 1 : Get all the notes Using : GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    // getting all the notes through user id received from the fetchUser function
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
})


// ROUTE 2 : Add a note Using : POST "/api/auth/addnote". Login required

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


module.exports = router;


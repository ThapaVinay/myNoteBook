const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

// it is secret key to sign the token
const JWT_Secret = "vinay thapa";


// ROUTE 1 : Create a user using POST "/api/auth/createuser". No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {

        let success = false;

        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ success, errors: errors.array() });
        }

        try {
            // check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists." })
            }

            // salt for the hash
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });
            
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_Secret);
            success = true;
            res.json({ success, authToken });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!");
        }
    })


// ROUTE 2 : Authenticate a useer using : POST "/api/auth/login", No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
    async (req, res) => {
        let success = false;
        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success , error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_Secret);
            success = true;
            res.json({ success, authToken });

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!");
        }

    })


// ROUTE 3 : Get loged in user details Using : POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {

        try {
            userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            res.json(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!");
        }
    });


module.exports = router;


const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// it is secret key to sign the token
const JWT_Secret = "vinay thapa";

// Create a user using POST "/api/auth/createuser". No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        
        try {
            // check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists." })
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

            // using object id as the data for the auth token
            const data = {
                user:{
                    id : user.id
                }
            }
            
            const authToken = jwt.sign(data,JWT_Secret);
            res.json({authToken});
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured!");
        }
    })


module.exports = router;


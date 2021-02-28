const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");

router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) {
            return res.status(400).json({username: "Username already taken"})
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.email,
                type: req.body.type
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }  
    })
})
module.exports = router;
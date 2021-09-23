require('dotenv').config()
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const dbcon = require('../dbconf/dbconfig');
const jwt = require('jsonwebtoken');
const localstorage = require('local-storage');
const router = express.Router();
router.post('/', (req, res) => {
    const { email, pass } = req.body;
    const check_user_exists = "SELECT * FROM user_data WHERE email='" + email + "'";
    dbcon.query(check_user_exists, (err, result) => {
        if (result.length > 0) {
            if (bcrypt.compareSync(pass, result[0].pass) === true) {
                jwt.sign({ user: result[0].email }, process.env.TOKEN_SECRET, (err, token) => {
                    res.setHeader("access-token", token)
                    res.json({
                        message: "authorised"
                    })
                });

            } else {
                res.json({
                    message: "password incorrect"
                })
            }
        } else {
            res.json({
                message: "not exists"
            })
        }
    })
})

module.exports = router;
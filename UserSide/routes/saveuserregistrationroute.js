const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const dbcon = require('../dbconf/dbconfig');
const jwt = require('jsonwebtoken');
const check_email_already_exists_middleware = require('../middlewares/checkifemailalreadyexists');
const saltRounds = 10;
const router = express.Router();
router.use(express.static(path.join(__dirname, "../public")))
router.post('/', check_email_already_exists_middleware, (req, res) => {
    if (req.status !== "exists") {
        const { name, email, pass } = req.body;
        const hashpass = bcrypt.hashSync(pass, saltRounds);
        const insert_query = "INSERT INTO user_data(name,email,pass)VALUES('" + name + "','" + email + "','" + hashpass + "')"
        dbcon.query(insert_query, (err, result) => {
            if (err) {
                return res.json({
                    "message": "error in inserting"
                })
            } else {
                jwt.sign({ user: email }, process.env.TOKEN_SECRET, (err, token) => {
                    res.setHeader("access-token", token)
                    return res.json({
                        "message": "inserted"
                    })
                })
            }
        })
    } else {
        res.json({
            message: "alreadyexists"
        })
    }
})
module.exports = router;
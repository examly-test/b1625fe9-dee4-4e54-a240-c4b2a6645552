const express = require('express');
const path = require('path');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

const check_for_dupe_email = function(req, res, next) {
    const { email } = req.body;
    const check_email_exists = "SELECT * FROM user_data WHERE email = '" + email + "'";
    dbcon.query(check_email_exists, (err, result) => {
        if (result.length > 0) {
            req.status = "exists";
            next();
        } else {
            req.status = "not exists";
            next();
        }
    })
}

module.exports = check_for_dupe_email;
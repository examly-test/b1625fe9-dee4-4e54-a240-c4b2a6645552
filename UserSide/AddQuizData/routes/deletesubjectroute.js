const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { subject } = req.body;
    const delete_difficulty_query = 'DELETE FROM quiz_data WHERE sub="' + subject + '"';
    dbcon.query(delete_difficulty_query, (err, result) => {
        if (result.affectedRows > 0) {
            return res.send({
                "status": "deleted"
            })
        } else {
            return res.send({
                "status": "notdeleted"
            })
        }
    })
})

module.exports = router;
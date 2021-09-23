const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { id } = req.body;
    var delete_query = ' DELETE FROM quiz_data WHERE Id = "' + id + '" ';
    dbcon.query(delete_query, (err, result) => {
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
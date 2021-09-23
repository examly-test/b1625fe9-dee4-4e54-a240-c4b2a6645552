const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { sub } = req.body;
    var check_if_particular_sub_exists_query = ' SELECT * FROM quiz_data WHERE sub = "' + sub + '" ';
    dbcon.query(check_if_particular_sub_exists_query, (err, result) => {
        if (result.length > 0) {
            return res.send({
                "status": "dataexists"
            })
        } else {
            return res.send({
                "status": "datanotexist"
            })
        }
    })
})

module.exports = router;
const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { id, question, option1, option2, option3, option4, answer, explanation } = req.body;
    var modify_qac_query = ' UPDATE quiz_data SET question="' + question + '", option1="' + option1 + '", option2="' + option2 + '", option3="' + option3 + '", option4="' + option4 + '", answer="' + answer + '" , explanation="' + explanation + '" WHERE Id="' + id + '" ';
    dbcon.query(modify_qac_query, (err, result) => {
        if (result.affectedRows > 0) {
            return res.send({
                "status": "success"
            })
        } else {
            return res.send({
                "status": "notupdated"
            })
        }
    })
})

module.exports = router;
const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    var section_output = ' ';
    const { subject, chapter, difficulty } = req.body;
    var select_distinct_section_query = 'SELECT DISTINCT section from quiz_data WHERE sub="' + subject + '" AND chapter="' + chapter + '" AND difficulty="' + difficulty + '"';
    dbcon.query(select_distinct_section_query, (err, result) => {
        if (result.length < 1) {
            return res.send({
                "message": "empty"
            })
        }
        for (var i = 0; i < result.length; i++) {
            section_output += ' <br> <a class="btn btn-outline-secondary qaccoll" id="sectionbtn" data-chapt="' + chapter + '" data-diffic="' + difficulty + '" data-toggle="qaccollapse" href="#collapseQac" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 175px;position: relative;left: 154px;">' + result[i].section + '</a>  <br> <div class="qaccollapse"  id="collapseQac"> </div>';
        }
        return res.send({
            "output": section_output,
            "status": "exists"
        })
    })
})

module.exports = router;
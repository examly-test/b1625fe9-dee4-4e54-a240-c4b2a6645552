const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    var chapter_output = ' ';
    const { subject, difficulty } = req.body;
    var select_distinct_chapter_query = 'SELECT DISTINCT chapter FROM quiz_data WHERE difficulty="' + difficulty + '" AND sub="' + subject + '"';
    dbcon.query(select_distinct_chapter_query, (err, result) => {
        if (result.length < 1) {
            return res.send({
                "message": "empty"
            })
        }
        for (var i = 0; i < result.length; i++) {
            chapter_output += ' <br> <a class="btn btn-outline-warning sectioncoll" id="chapterbtn" data-diffic="' + difficulty + '" data-toggle="collapse" href="#collapseSection" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 238px;position: relative;left: 122px;">' + result[i].chapter + '</a>  <br> <div class="seccollapse"  id="collapseSection"> </div>';
        }
        return res.send({
            "output": chapter_output,
            "status": "exists"
        })
    })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, (req, res) => {
    if (req.status === 'exists') {
        const { subject, difficulty, chapter } = req.body;
        var htmlOutput = ' ';
        const get_section_query = 'select distinct section from quiz_data where sub="' + subject + '" and difficulty="' + difficulty + '" and chapter="' + chapter + '"';
        dbcon.query(get_section_query, (err, result) => {
            for (let index = 0; index < result.length; index++) {

                htmlOutput += '<li><a id="sectionlink" href="#" data-dif="' + difficulty + '" data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + result[index].section + '">' + result[index].section + '</a></li><br>';

            }
            res.json({
                output: htmlOutput
            })
        })
    }
})

module.exports = router;
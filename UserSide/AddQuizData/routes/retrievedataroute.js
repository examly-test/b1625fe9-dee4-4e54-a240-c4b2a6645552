const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();
router.post('/', (req, res) => {
    var buffdata = '';
    const { difficulty, subject, chapter, section, question, option1, option2, option3, option4, answer, explanation } = req.body;
    const select_query = 'SELECT * FROM quiz_data WHERE difficulty="' + difficulty + '" AND sub="' + subject + '" AND chapter="' + chapter + '" AND section="' + section + '" AND question="' + question + '" AND option1="' + option1 + '" AND option2="' + option2 + '" AND option3="' + option3 + '" AND option4="' + option4 + '" AND answer="' + answer + '" AND explanation="' + explanation + '"';
    dbcon.query(select_query, (err, result) => {
        for (i = 0; i < result.length; i++) {
            buffdata += ' <br> <div class="card"> ' +
                '<div class="card-body">' +
                '<label>Difficulty level </label>' +
                '<label>' + result[i].difficulty + '</label>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Subject</span>' +
                '</div>' +
                '<input type="text" id="subject" value=' + result[i].sub + ' class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Chapter</span>' +
                '</div>' +
                '<input type="text" id="chapter" value=' + result[i].chapter + ' class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Section</span>' +
                '</div>' +
                '<input type="text" id="section" value=' + result[i].section + ' class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Question</span>' +
                '</div>' +
                '<input type="text" id="question" value=' + result[i].question + ' class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" id="answer" name="options"aria-label="Checkbox for following text input" disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" id="optionstext" value=' + result[i].option1 + ' class="form-control"aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" id="answer" name="options"aria-label="Checkbox for following text input" disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" id="optionstext" value=' + result[i].option2 + ' class="form-control"aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" id="answer" name="options"aria-label="Checkbox for following text input"  disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" id="optionstext" value=' + result[i].option3 + ' class="form-control"aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" id="answer" name="options"aria-label="Checkbox for following text input"  disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" id="optionstext" value=' + result[i].option4 + ' class="form-control"aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Explanation</span>' +
                '</div>' +
                '<input type="text" id="explanation" value=' + result[i].explanation + ' class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<label>Answer: </label> <label> ' + result[i].answer + ' </label>' +
                '</div>' +
                '</div>'
        }
        res.send({
            output: buffdata
        })
    })
})
module.exports = router;
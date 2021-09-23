const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { difficulty, chapter } = req.body;
    var section_form = '<br>' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<div class="axtrsec">' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Section</span>' +
        '</div>' +
        '<input type="text" id="exsection1" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Question</span>' +
        '</div>' +
        '<input type="text" id="exquestion1" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer1" name="exoptions1" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext1" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer1" name="exoptions1" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext1" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer1" name="exoptions1" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext1" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer1" name="exoptions1" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext1" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +

        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Explanation</span>' +
        '</div>' +
        '<input type="text" id="exsecexplanation" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +

        '<button type="button" id="asec" data-dif="' + difficulty + '" data-chap="' + chapter + '" class="btn btn-outline-success " style="margin-left: 185px;">Add Section</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    res.send({
        "output": section_form
    })

})

module.exports = router;
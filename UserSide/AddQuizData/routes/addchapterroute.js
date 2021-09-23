const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post("/", (req, res) => {
    const { difficulty } = req.body;
    var extra_chapter_form = '<br>' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<div class="axtrchap">' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Chapter</span>' +
        '</div>' +
        '<input type="text" id="exchapter" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Section</span>' +
        '</div>' +
        '<input type="text" id="exsection" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Question</span>' +
        '</div>' +
        '<input type="text" id="exquestion" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer" name="exoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer" name="exoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer" name="exoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="exqac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="exanswer" name="exoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="exoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +

        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Explanation</span>' +
        '</div>' +
        '<input type="text" id="exchapexplanation" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +

        '<button type="button" id="achap" data-id="' + difficulty + '" class="btn btn-outline-success " style="margin-left: 185px;">Add Chapter</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return res.send({
        "output": extra_chapter_form
    })
})


module.exports = router;
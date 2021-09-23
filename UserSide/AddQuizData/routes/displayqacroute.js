const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
    const { subj, chapter, section, difficulty } = req.body;
    var qac_output = '<br> <div class="card">' +
        '<div class="card-body">' +
        '<div id="topicbody">' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Question</span>' +
        '</div>' +
        '<input type="text" id="modquestion" class="form-control" aria-label="Small"aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<div id="qac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="modanswer" name="modoptions"aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="modoptionstext" class="form-control"aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="qac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="modanswer" name="modoptions"aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="modoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="qac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="modanswer" name="modoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="modoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div id="qac" class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<div class="input-group-text">' +
        '<input type="radio" id="modanswer" name="modoptions" aria-label="Checkbox for following text input">' +
        '</div>' +
        '</div>' +
        '<input type="text" id="modoptionstext" class="form-control" aria-label="Text input with checkbox">' +
        '</div>' +
        '<div class="input-group input-group-sm mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Explanation</span>' +
        '</div>' +
        '<input type="text" id="mexplanation" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">' +
        '</div>' +
        '<button type="button" id="modsave" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" class="btn btn-outline-success "style="margin-left: 185px;">Save</button>' +
        '</div>' +
        '<div class="displayquestions">' +

        '</div>' +
        '</div>' +
        '</div>';
    var select_qac_query = ' SELECT * FROM quiz_data WHERE chapter="' + chapter + '" AND section="' + section + '" AND difficulty = "' + difficulty + '" AND sub="' + subj + '"';
    dbcon.query(select_qac_query, (err, result) => {
        if (result.length < 1) {
            return res.send({
                "message": "empty"
            })
        }
        for (var i = 0; i < result.length; i++) {
            qac_output += '<br>' +
                '<div class="modtopic">' +
                '<div class="card">' +
                '<div class="card-body">' +
                '<label id="difflev">Difficulty level ' + result[i].difficulty + '</label>' +
                '<div class="difficultylevel" style="display:none;">' +
                '<label> Select difficulty level: </label>' +
                '<input type="radio" name="mdiff" id="difficulty" value="easy" style="margin-left: 10px" />' +
                '<label>Easy</label>' +

                '<input type="radio" name="mdiff" id="difficulty" value="medium" style="margin-left: 10px" />' +
                '<label>Medium</label>' +

                '<input type="radio" name="mdiff" id="difficulty" value="hard" style="margin-left: 10px" />' +
                '<label>Hard</label>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Chapter</span>' +
                '</div>' +
                '<input type="text" id="mchapter" value="' + result[i].chapter + '" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Section</span>' +
                '</div>' +
                '<input type="text" id="msection" value="' + result[i].section + '" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Question</span>' +
                '</div>' +
                '<input type="text" id="mquestion" value="' + result[i].question + '" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" class="manswer" name="moptions" aria-label="Checkbox for following text input" disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" value="' + result[i].option1 + '" name="mopt" class="form-control moptionstext" aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" class="manswer" name="moptions" aria-label="Checkbox for following text input" disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" value="' + result[i].option2 + '" name="mopt" class="form-control moptionstext" aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" class="manswer" name="moptions" aria-label="Checkbox for following text input"  disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" value="' + result[i].option3 + '" name="mopt" class="form-control moptionstext" aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div id="qac" class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="radio" class="manswer" name="moptions" aria-label="Checkbox for following text input"  disabled>' +
                '</div>' +
                '</div>' +
                '<input type="text" value="' + result[i].option4 + '" name="mopt" class="form-control moptionstext" aria-label="Text input with checkbox" disabled>' +
                '</div>' +
                '<div class="input-group input-group-sm mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text" id="inputGroup-sizing-sm">Enter Explanation</span>' +
                '</div>' +
                '<input type="text" value="' + result[i].explanation + '" id="modexplanation" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled>' +
                '</div>' +
                '<label>Answer: </label> <label> "' + result[i].answer + '" </label> <br>' +
                '<button type="button" id="editbtn" class="btn btn-outline-primary" style="margin-left:20px;">Edit</button>' +
                '<button type="button" id="savebtn" data-id="' + result[i].Id + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" class="btn btn-outline-success" style="margin-left:20px; display:none;">Save</button>' +
                '<button type="button" id="delbtn"  data-id="' + result[i].Id + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '"  class="btn btn-outline-danger" style="margin-left:20px;">Delete</button>' +

                '</div>' +
                '</div>' +

                '</div>';
        }
        return res.send({
            "output": qac_output,
            "status": "exists"
        })
    })
})

module.exports = router;
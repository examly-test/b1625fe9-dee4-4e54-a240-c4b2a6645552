const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, (req, res) => {
    if (req.status === 'exists') {
        const { subject, chapter, section, difficulty, id } = req.body;
        var htmloutput = '<div class="card">' +
            '<div class="card-body">';

        const select_query = 'select * from quiz_data where sub="' + subject + '" and chapter="' + chapter + '" and section="' + section + '" and difficulty="' + difficulty + '"'
        dbcon.query(select_query, (err, result) => {
            if (parseInt(id) === result.length) {
                res.json({
                    status: '<a id="checkresults" href="#" style="text-align:center;" data-noqn="' + result.length + '"><h3>Check Out Your Results</h3></a>'
                })
            } else {
                for (let index = 0; index < result.length; index++) {
                    if (index === parseInt(id)) {
                        htmloutput += '<h3>' + result[index].question + '</h3>' +
                            '<div class="input-group">' +
                            '<div class="input-group-prepend">' +
                            '<div class="input-group-text">' +
                            '<input type="radio" name="selectoption" value=' + result[index].option1 + '  data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" data-qn="' + result[index].question + '" aria-label="Radio button for following text input">' +
                            '</div>' +
                            '</div>' +
                            '<input type="text" class="form-control" value=' + result[index].option1 + ' aria-label="Text input with radio button" disabled>' +
                            '</div>' +
                            '<div class="input-group">' +
                            '<div class="input-group-prepend">' +
                            '<div class="input-group-text">' +
                            '<input type="radio" name="selectoption" value=' + result[index].option2 + '  data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" data-qn="' + result[index].question + '"  aria-label="Radio button for following text input">' +
                            '</div>' +
                            '</div>' +
                            '<input type="text" class="form-control"  value=' + result[index].option2 + ' aria-label="Text input with radio button" disabled>' +
                            '</div>' +
                            '<div class="input-group">' +
                            '<div class="input-group-prepend">' +
                            '<div class="input-group-text">' +
                            '<input type="radio" name="selectoption"  value=' + result[index].option3 + '  data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" data-qn="' + result[index].question + '" aria-label="Radio button for following text input">' +
                            '</div>' +
                            '</div>' +
                            '<input type="text" class="form-control"  value=' + result[index].option3 + ' aria-label="Text input with radio button" disabled>' +
                            '</div>' +
                            '<div class="input-group">' +
                            '<div class="input-group-prepend">' +
                            '<div class="input-group-text">' +
                            '<input type="radio" name="selectoption" value=' + result[index].option4 + '   data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" data-qn="' + result[index].question + '"  aria-label="Radio button for following text input">' +
                            '</div>' +
                            '</div>' +
                            '<input type="text" class="form-control" value=' + result[index].option4 + '  aria-label="Text input with radio button" disabled>' +
                            '</div>';
                        htmloutput += ' </div>' +
                            '</div>' +
                            '<button type="button" name="next" id="nextqn" data-sub="' + subject + '" data-chap="' + chapter + '" data-sec="' + section + '" data-dif="' + difficulty + '" data-id="' + id + '" class="btn btn-primary" btn-lg btn-block" style="position: absolute; top: 432px;right: 776px;">Next</button>';
                        res.json({
                            output: htmloutput
                        })
                    }
                }
            }

        })
    }

})

module.exports = router;
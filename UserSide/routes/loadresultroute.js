const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, (req, res) => {
    if (req.status === 'exists') {
        const { user } = req.getuseremail
        const { numberofquestions } = req.body
        const select_query = 'select * from userresult where user = "' + user + '"';
        dbcon.query(select_query, (err, result) => {
            var htmlOutput = '<ul class="list-group" style="margin:auto;"">';

            var correctArr = 0;
            if (result.length > 0) {
                const percentage = (result.length / numberofquestions) * 100
                for (let index = 0; index < result.length; index++) {
                    if (result[index].selectedoption === result[index].answer) {
                        correctArr += 1;
                    }
                }
                const correctanswerpercentage = (correctArr / numberofquestions) * 100
                for (let index = 0; index < result.length; index++) {
                    if (result[index].selectedoption !== result[index].answer) {
                        htmlOutput += '<li class="list-group-item lgi">Qusetion: ' + result[index].question + '<br>' +
                            'Answer: ' + result[index].answer + '<br>' +
                            'Explanation: ' + result[index].explanation + '' +
                            '</li>';
                    }
                }
                htmlOutput += '</ul>';
                res.json({
                    questionsanswered: percentage,
                    questionsunanswered: 100 - percentage,
                    questionsunansweredtooltip: numberofquestions - (result.length),
                    questionsansweredtooltip: result.length,
                    correctanswers: correctanswerpercentage,
                    totalquestions: 100 - correctanswerpercentage,
                    correctanswerstooltip: correctArr,
                    wronganswertooltip: numberofquestions - correctArr,
                    output: htmlOutput,
                    user: user
                })
            } else {
                res.json({
                    questionsanswered: 0,
                    totalquestions: numberofquestions
                })
            }
        })
    }

})

module.exports = router;
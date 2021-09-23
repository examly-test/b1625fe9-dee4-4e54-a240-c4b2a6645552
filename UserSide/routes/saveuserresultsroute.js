const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, async(req, res) => {
    const { questionsunanswered, questionsanswered, questionsunansweredtooltip, questionsansweredtooltip, correctanswers, wronganswers, correctanswerstooltip, wronganswerstooltip, user, userwronganswers, datecreated } = req.body;
    const status = await deleteQuery(user);
    if (status === 'deleted') {
        const insert_query = 'INSERT INTO savedresults(questionsunanswered,questionsanswered,questionsunansweredtooltip,questionsansweredtooltip, correctanswers, wronganswers, correctanswerstooltip, wronganswerstooltip, user, datecreated, userwronganswers) VALUES("' + questionsunanswered + '","' + questionsanswered + '", "' + questionsunansweredtooltip + '","' + questionsansweredtooltip + '", "' + correctanswers + '", "' + wronganswers + '", "' + correctanswerstooltip + '", "' + wronganswerstooltip + '", "' + user + '", "' + datecreated + '", "' + userwronganswers + '"); '
        dbcon.query(insert_query, (err, result) => {
            console.log(err)
            if (err) {
                res.json(({
                    Error: err
                }))
            } else {
                res.json({
                    status: 'success'
                })
            }
        })
    }
})


function deleteQuery(user) {
    return new Promise((resolve, reject) => {
        const delete_query = 'delete from userresult where user="' + user + '"';
        dbcon.query(delete_query, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                resolve('deleted')
            }
        })
    })
}

module.exports = router;
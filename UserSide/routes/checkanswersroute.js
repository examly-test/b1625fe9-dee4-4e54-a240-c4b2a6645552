const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, async(req, res) => {
    const { user } = req.getuseremail;
    if (req.status === 'exists') {
        const { subject, chapter, difficulty, section, question, selectedoption } = req.body
        const checkquestionalreadyexists = await checkifuseralreadyansweredthequestion(question, user, subject, chapter, difficulty, section)
        if (checkquestionalreadyexists === 'notexists') {
            const select_answer_explanation = 'select answer,explanation from quiz_data where sub="' + subject + '" and chapter="' + chapter + '" and difficulty="' + difficulty + '" and section="' + section + '" and question="' + question + '"';
            dbcon.query(select_answer_explanation, async(err, result) => {
                const exec_query = await insertResultIntoDb(subject, chapter, section, result[0].answer, selectedoption, result[0].explanation, question, user, difficulty)
                res.json({
                    status: exec_query
                })
            })
        } else {
            const update = await updatedb(subject, chapter, difficulty, section, question, selectedoption, user)
        }
    }
})

function insertResultIntoDb(subject, chapter, section, answer, selectedoption, explanation, question, user, difficulty) {
    return new Promise((resolve, reject) => {
        const insert_query = 'insert into userresult(subject,chapter,section,answer,selectedoption,explanation,question,user,difficulty)values("' + subject + '","' + chapter + '","' + section + '","' + answer + '","' + selectedoption + '","' + explanation + '","' + question + '","' + user + '","' + difficulty + '")'
        dbcon.query(insert_query, (err, result) => {
            if (!err) {
                resolve('inserted')
            }
        })
    })
}

function checkifuseralreadyansweredthequestion(question, user, subject, chapter, difficulty, section) {
    return new Promise((resolve, reject) => {
        const check_query = 'select * from userresult where question="' + question + '" and user="' + user + '" and subject="' + subject + '" and chapter="' + chapter + '" and difficulty="' + difficulty + '" and section="' + section + '"';
        dbcon.query(check_query, (err, result) => {
            if (result.length > 0) {
                resolve('exists')
            } else {
                resolve('notexists')
            }
        })
    })
}

function updatedb(subject, chapter, difficulty, section, question, selectedoption, user) {
    return new Promise((resolve, reject) => {
        const update_query = 'update userresult set selectedoption ="' + selectedoption + '" where subject="' + subject + '" and chapter="' + chapter + '" and difficulty="' + difficulty + '" and section="' + section + '" and question="' + question + '" and user="' + user + '"';
        dbcon.query(update_query, (err, result) => {
            if (!err) {
                resolve('updated')
            }
        })
    })
}

module.exports = router;
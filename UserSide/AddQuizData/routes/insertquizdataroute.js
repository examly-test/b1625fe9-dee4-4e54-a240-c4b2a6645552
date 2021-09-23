const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const checkifdataexists = require('../middlewares/checkdataalreadyexists');
const router = express.Router();
router.post('/', checkifdataexists, (req, res) => {
    if (req.status === "exists") {
        return res.send({
            message: "question already exists"
        })
    }
    const { difficulty, subject, chapter, section, question, option1, option2, option3, option4, answer, explanation } = req.body;
    const insertQuery = "INSERT INTO quiz_data (difficulty,sub,chapter,section,question,option1,option2,option3,option4,answer,explanation) VALUES ('" + difficulty + "','" + subject + "','" + chapter + "','" + section + "','" + question + "','" + option1 + "','" + option2 + "','" + option3 + "','" + option4 + "','" + answer + "','" + explanation + "')";
    dbcon.query(insertQuery, function(err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return res.send({
                "message": "inserted"
            })
        }

    });
})

//checking for sonar cloud

router.post('/', checkifdataexists, (req, res) => {
    if (req.status === "exists") {
        return res.send({
            message: "question already exists"
        })
    }
    const { difficulty, subject, chapter, section, question, option1, option2, option3, option4, answer, explanation } = req.body;
    const insertQuery = "INSERT INTO quiz_data (difficulty,sub,chapter,section,question,option1,option2,option3,option4,answer,explanation) VALUES ('" + difficulty + "','" + subject + "','" + chapter + "','" + section + "','" + question + "','" + option1 + "','" + option2 + "','" + option3 + "','" + option4 + "','" + answer + "','" + explanation + "')";
    dbcon.query(insertQuery, function(err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return res.send({
                "message": "inserted"
            })
        }

    });
})
module.exports = router;

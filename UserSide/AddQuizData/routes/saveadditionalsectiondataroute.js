const express = require('express');
const dbcon = require('../dbconf/dbconfig');
const router = express.Router();
const checkduplicatesection = require('../middlewares/checkifsectionexists');
const checkduplicatequestion = require('../middlewares/checkifquestionexists');
router.post('/', checkduplicatesection, checkduplicatequestion, (req, res) => {
    if (req.status === "sectionexists") {
        return res.send({
            message: "section already exists"
        })
    } else if (req.status === "questionexists") {
        return res.send({
            message: "question already exists"
        })
    } else {
        const { difficulty, subject, chapter, section, question, option1, option2, option3, option4, answer, explanation } = req.body;
        const insertQuery = "INSERT INTO quiz_data (difficulty,sub,chapter,section,question,option1,option2,option3,option4,answer,explanation) VALUES ('" + difficulty + "','" + subject + "','" + chapter + "','" + section + "','" + question + "','" + option1 + "','" + option2 + "','" + option3 + "','" + option4 + "','" + answer + "','" + explanation + "')";
        dbcon.query(insertQuery, function(err, result) {
            if (err) {
                return err;
            } else {
                return res.send({
                    "message": "inserted"
                })
            }

        });
    }

})

module.exports = router;
const dbcon = require('../dbconf/dbconfig');
const checkdupechaptermiddleware = function(req, res, next) {
    const { difficulty, subject, chapter, question } = req.body;
    const check_query_if_exists = 'SELECT * FROM quiz_data  WHERE difficulty="' + difficulty + '" AND sub="' + subject + '" AND chapter="' + chapter + '" ';
    dbcon.query(check_query_if_exists, (err, result) => {
        if (result.length !== 0) {
            req.status = "chapterexists";
            next();
        }
        next();
    })
}

module.exports = checkdupechaptermiddleware;
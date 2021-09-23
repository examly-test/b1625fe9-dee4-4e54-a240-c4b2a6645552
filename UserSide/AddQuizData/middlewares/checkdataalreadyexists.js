const dbcon = require('../dbconf/dbconfig');
const checkdupemiddleware = function(req, res, next) {
    const { difficulty, subject, chapter, section, question } = req.body;
    const check_query_if_exists = 'SELECT * FROM quiz_data  WHERE difficulty="' + difficulty + '" AND sub="' + subject + '" AND chapter="' + chapter + '" AND section="' + section + '"   AND question="' + question + '"';
    dbcon.query(check_query_if_exists, (err, result) => {
        if (result.length !== 0) {
            req.status = "exists";
            next();
        }
        next();
    })
}

module.exports = checkdupemiddleware;
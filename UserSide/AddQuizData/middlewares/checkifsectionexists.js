const dbcon = require('../dbconf/dbconfig');
const checkdupesectionmiddleware = function(req, res, next) {
    const { difficulty, subject, chapter, section } = req.body;
    const check_query_if_exists = 'SELECT * FROM quiz_data  WHERE difficulty="' + difficulty + '" AND sub="' + subject + '" AND chapter="' + chapter + '" AND section="' + section + '" ';
    dbcon.query(check_query_if_exists, (err, result) => {
        if (result.length !== 0) {
            req.status = "sectionexists";
            next();
        }
        next();
    })
}

module.exports = checkdupesectionmiddleware;
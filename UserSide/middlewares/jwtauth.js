require('dotenv').config()
const dbcon = require('../dbconf/dbconfig');
const jwt = require('jsonwebtoken');
const url = require('url');
const verifytoken = function verifyToken(req, res, next) {
    const require_url = url.parse(req.originalUrl, true);
    const querydata = require_url.query
    if (!querydata.token) {
        req.status = "not exists"
        next();
    } else {
        const token = querydata.token;
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                req.status = "not exists"
                next();
            } else if (decoded.user) {
                req.getuseremail = decoded
                req.status = "exists";
                next();
            } else {
                req.status = "not exists";
                next();
            }
        });
    }
}
module.exports = verifytoken;
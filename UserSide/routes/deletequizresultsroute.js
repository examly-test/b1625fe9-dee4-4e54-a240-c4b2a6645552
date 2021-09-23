const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.post('/', token_middleware, async(req, res) => {
    if (req.status === 'exists') {
        const { user } = req.getuseremail;
        const status = await checkifuserexists(user);
        console.log(status)
        if (status !== 'notexists') {
            const delete_query = 'delete from userresult where user="' + user + '"';
            dbcon.query(delete_query, (err, result) => {
                if (result) {
                    res.json({
                        status: 'deleted'
                    })
                } else {
                    res.json({
                        status: 'notdeleted'
                    })
                }
            })
        } else {
            res.json({
                status: 'notexists'
            })
        }
    }
})

function checkifuserexists(user) {
    return new Promise((resolve, reject) => {
        const select_query = 'select * from userresult where user ="' + user + '"';
        dbcon.query(select_query, (err, result) => {
            if (result) {
                resolve('exists')
            } else {
                resolve('notexists')
            }
        })
    })
}

module.exports = router;
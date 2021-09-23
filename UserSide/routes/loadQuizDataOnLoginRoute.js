const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');
router.get('/', token_middleware, (req, res) => {
    if (req.status === "exists") {
        var HTMLoutput = ' ';
        const get_all_data = "select distinct sub from quiz_data";
        dbcon.query(get_all_data, async(err, result) => {
            for (let index = 0; index < result.length; index++) {
                const checkeasy = await checkifeasyexists(result[index].sub)
                if (checkeasy !== 'notexists') {
                    const checkmedium = await checkifmediumexists(checkeasy)
                    if (checkmedium != 'notexists') {
                        const output = await getSubData(checkmedium)
                        HTMLoutput += output;
                    }
                }
            }
            res.json({
                output: HTMLoutput
            })
        })
    } else {
        res.json({
            message: "unauthorized"
        })
    }
});

function getSubData(res) {
    var renderData = '<div class="card subdatacard" id="asd" style="width: 18rem; margin: 0 auto; display:inline-block; margin-left: 31px; margin-bottom: 50px;">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + res + '</h5>';
    return new Promise((resolve, reject) => {
        dbcon.query("select distinct chapter from quiz_data where sub='" + res + "' and difficulty = 'easy' ", (err, result) => {
            for (let index = 0; index < result.length; index++) {
                renderData += '<a class="chapcoll" data-toggle="collapse" id="chapterbtn" href="#chaptercollapse" data-dif="easy" data-sub="' + res + '" data-chap="' + result[index].chapter + '" role="button" aria-expanded="false" aria-controls="collapseExample">' +
                    '<li>' + '' + result[index].chapter + '' + '</li>' + '<br>' +
                    '</a>' +
                    '<div class="collapse chcol" id="chaptercollapse">' +
                    '<div class="card card-body">' +
                    '</div>' +
                    '</div>';
            }
            renderData += '</div>' +
                '</div>';
            resolve(renderData);
        })
    })

}

function checkifeasyexists(subject) {
    return new Promise((resolve, reject) => {
        const check_query = "select * from quiz_data where difficulty='easy' and sub='" + subject + "'";
        dbcon.query(check_query, (err, result) => {
            var sub = result[0];
            if (sub !== undefined) {
                resolve(sub.sub)
            } else {
                resolve('notexists')
            }
        })
    })
}

function checkifmediumexists(subject) {
    return new Promise((resolve, reject) => {
        const check_query = "select * from quiz_data where difficulty='medium' and sub='" + subject + "'";
        dbcon.query(check_query, (err, result) => {
            var sub = result[0];
            if (sub !== undefined) {
                resolve(sub.sub)
            } else {
                resolve('notexists')
            }
        })
    })
}


module.exports = router;
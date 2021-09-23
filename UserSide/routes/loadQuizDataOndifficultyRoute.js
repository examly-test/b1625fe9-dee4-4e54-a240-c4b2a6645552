const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');
router.post('/', token_middleware, (req, res) => {
    if (req.status === "exists") {
        const { difficulty } = req.body;
        var HTMLoutput = ' ';
        const get_all_data = "select distinct sub from quiz_data";
        dbcon.query(get_all_data, async(err, result) => {
            for (let index = 0; index < result.length; index++) {
                if (difficulty === 'Medium' || difficulty === 'Easy') {
                    const checkeasy = await checkifeasyexists(result[index].sub);
                    if (checkeasy !== 'notexists') {
                        const checkmedium = await checkifmediumexists(checkeasy)
                        if (checkmedium !== 'notexists') {
                            const output = await getSubData(checkmedium, difficulty)
                            HTMLoutput += output;
                        }
                    }

                } else {
                    const output = await getSubData(result[index].sub, difficulty)
                    var type = typeof output;
                    if (type !== 'object') {
                        HTMLoutput += output;
                    } else {
                        HTMLoutput = output
                        return res.json({
                            output: HTMLoutput
                        })
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

function getSubData(res, difficulty) {
    var renderData = '<div class="card" style="width: 18rem; margin: 0 auto; display:inline-block; margin-left: 31px; margin-bottom: 50px;">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + res + '</h5>';
    return new Promise((resolve, reject) => {
        if (difficulty === 'Medium') {
            dbcon.query("select distinct chapter from quiz_data where sub='" + res + "' and difficulty = '" + difficulty + "' ", (err, result) => {
                if (result.length > 0) {
                    for (let index = 0; index < result.length; index++) {
                        renderData += '<a class="chapcoll" data-toggle="collapse" id="chapterbtn" href="#chaptercollapse" data-dif="' + difficulty + '" data-sub="' + res + '" data-chap="' + result[index].chapter + '" role="button" aria-expanded="false" aria-controls="collapseExample">' +
                            '<li>' + '' + result[index].chapter + '' + '</li>' + '<br>' +
                            '</a>' +
                            '<div class="collapse chcol" id="chaptercollapse">' +
                            '<div class="card card-body">' +
                            '</div>' +
                            '</div>';
                    }
                    renderData += '</div>' +
                        '</div>' +
                        '<span style="display:inline-block; width: 50px;"></span>';
                    resolve(renderData);
                } else {
                    resolve(' ');
                }

            })
        } else {
            dbcon.query("select distinct chapter from quiz_data where sub='" + res + "' and difficulty = '" + difficulty + "' ", (err, result) => {
                if (result.length > 0) {
                    for (let index = 0; index < result.length; index++) {
                        renderData += '<a class="chapcoll" data-toggle="collapse" id="chapterbtn" href="#chaptercollapse" data-dif="' + difficulty + '" data-sub="' + res + '" data-chap="' + result[index].chapter + '" role="button" aria-expanded="false" aria-controls="collapseExample">' +
                            '<li>' + '' + result[index].chapter + '' + '</li>' + '<br>' +
                            '</a>' +
                            '<div class="collapse chcol" id="chaptercollapse">' +
                            '<div class="card card-body">' +
                            '</div>' +
                            '</div>';
                    }
                    renderData += '</div>' +
                        '</div>' +
                        '<span style="display:inline-block; width: 50px;"></span>';
                    resolve(renderData);
                } else {
                    resolve({
                        status: 'notfound',
                        difficulty: difficulty
                    });
                }

            })
        }

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
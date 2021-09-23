const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');
router.post('/', token_middleware, (req, res) => {
    if (req.status === "exists") {
        var HTMLoutput = ' ';
        const { useraltchoice, userprefdif } = req.body;
        const get_all_data = "select distinct sub from quiz_data";
        dbcon.query(get_all_data, async(err, result) => {
            for (let index = 0; index < result.length; index++) {
                const checkifsubexistseasy = await checkifeasyexists(result[index].sub)
                if (checkifsubexistseasy !== 'notexists') {
                    const checkifsubexistsmedium = await checkifmediumexists(checkifsubexistseasy);
                    if (checkifsubexistsmedium !== 'notexists') {
                        const output = await getSubData(checkifsubexistsmedium, userprefdif)
                        if (!output.difficulty) {

                            HTMLoutput += output;
                        } else {
                            const checkeasy = await checkifeasyexists(output.subject)
                            if (checkeasy !== 'notexists') {
                                const checkmedium = await checkifmediumexists(checkeasy)
                                if (checkmedium !== 'notexists') {
                                    const altOutput = await getAltSubData(checkmedium, useraltchoice)
                                    var type = typeof altOutput;
                                    if (type !== 'object') {
                                        HTMLoutput += altOutput
                                    } else {
                                        HTMLoutput += altOutput
                                    }
                                }
                            }

                        }
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

function getSubData(res, dif) {
    var renderData = '<div class="card" style="width: 18rem; margin: 0 auto; display:inline-block; margin-left: 31px; margin-bottom: 50px;">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + res + '</h5>';
    return new Promise((resolve, reject) => {
        dbcon.query("select distinct chapter from quiz_data where sub='" + res + "' and difficulty = '" + dif + "' ", (err, result) => {
            if (result.length > 0) {
                for (let index = 0; index < result.length; index++) {
                    renderData += '<a class="chapcoll" data-toggle="collapse" id="chapterbtn" href="#chaptercollapse" data-dif="' + dif + '" data-sub="' + res + '" data-chap="' + result[index].chapter + '" role="button" aria-expanded="false" aria-controls="collapseExample">' +
                        '<li>' + '' + result[index].chapter + '' + '</li>' + '<br>' +
                        '</a>' +
                        '<div class="collapse chcol" id="chaptercollapse">' +
                        '<div class="card card-body">' +
                        '</div>' +
                        '</div>';;
                }
                renderData += '</div>' +
                    '</div>' +
                    '<span style="display:inline-block; width: 50px;"></span>';
                resolve(renderData);
            } else {
                resolve({
                    difficulty: dif,
                    subject: res
                });
            }
        })
    })

}

function getAltSubData(sub, dif) {
    var renderData = '<div class="card" style="width: 18rem; margin: 0 auto; display:inline-block; margin-left: 31px; margin-bottom: 50px;">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + sub + '</h5>';
    return new Promise((resolve, reject) => {
        dbcon.query("select distinct chapter from quiz_data where sub='" + sub + "' and difficulty = '" + dif + "' ", (err, result) => {
            if (result.length > 0) {
                for (let index = 0; index < result.length; index++) {
                    renderData += '<a class="chapcoll" data-toggle="collapse" id="chapterbtn" href="#chaptercollapse" data-dif="' + dif + '" data-sub="' + sub + '" data-chap="' + result[index].chapter + '" role="button" aria-expanded="false" aria-controls="collapseExample">' +
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
                    difficulty: dif
                });
            }
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
const express = require('express');
const router = express.Router();
const dbcon = require('../dbconf/dbconfig');
const token_middleware = require('../middlewares/jwtauth');

router.get('/', token_middleware, (req, res) => {
    if (req.status === "exists") {
        var htmloutput = ' ';
        var obj;
        const { user } = req.getuseremail;
        const select_query = 'select * from savedresults where user = "' + user + '"';
        dbcon.query(select_query, (err, result) => {
            obj = result;
            if (err) {
                console.log(err)
            } else {
                for (let i = 0; i < result.length; i++) {
                    const userdata = result[i].userwronganswers.split(',');
                    console.log(userdata)
                    htmloutput += '<h3 style="text-align:center; font-family: cursive;">Quiz taken on ' + result[i].datecreated + '</h3>' +
                        '<div class="gchart" id="piechart' + i + '" style="width: 500px; height: 500px; margin-left: 109px;"></div>' +
                        '<div class="gchart1" id="piechartforcorrect' + i + '" style="width: 500px; height: 500px; margin-left: 561px; margin-top: -489px;"></div>' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<ul class="list-group">';
                    for (let j = 0; j < userdata.length; j++) {
                        htmloutput += '<li class="list-group-item">' + userdata[j] + '</li>'
                    }
                    htmloutput += '</ul>' +
                        '</div>' +
                        '</div>' +
                        '<br>';
                }
                res.json({
                    output: htmloutput,
                    data: obj
                })
            }
        })
    }
})

module.exports = router;
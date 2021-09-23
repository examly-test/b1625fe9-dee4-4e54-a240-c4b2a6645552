$(document).ready((e) => {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        const url = window.location.href;
        const geturlparams = new URLSearchParams(url)
        const getnumberofquestions = geturlparams.get('no');
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/loadresults?token=" + token + "",
            data: {
                numberofquestions: getnumberofquestions
            },
            dataType: "JSON",
            success: async function(response) {
                if (response.questionsanswered !== 0) {
                    google.charts.load('current', { 'packages': ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'heading');
                        data.addColumn('number', 'value');
                        data.addColumn({ type: 'string', role: 'tooltip' });
                        data.addRows([
                            ['Questions unanswered', response.questionsunanswered, "Questions unanswered: " + (response.questionsunansweredtooltip).toString()],
                            ['Questions answered', response.questionsanswered, "Questions answered: " + response.questionsansweredtooltip.toString()]
                        ]);
                        var options = {
                            tooltip: true
                        };

                        var crctdata = new google.visualization.DataTable();
                        crctdata.addColumn('string', 'heading');
                        crctdata.addColumn('number', 'value');
                        crctdata.addColumn({ type: 'string', role: 'tooltip' });
                        crctdata.addRows([
                            ['Correct answers', response.correctanswers, "Correct answers: " + (response.correctanswerstooltip).toString()],
                            ['Wrong Answers', response.totalquestions, "Wrong Answers: " + (response.wronganswertooltip).toString()]
                        ]);
                        var optionscrct = {
                            tooltip: true
                        }
                        var crctchart = new google.visualization.PieChart(document.getElementById('piechartforcorrect'));
                        crctchart.draw(crctdata, optionscrct);
                        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                        chart.draw(data, options);
                    }
                    $('#loadwrong').html(response.output);
                    $('#userchoice').html('<p>do you wish to save your results? <button type="button" id="save" data-qnun="' + response.questionsunanswered + '" data-qnan="' + response.questionsanswered + '" data-qnuntip="' + response.questionsunansweredtooltip + '" data-qnantip="' + response.questionsansweredtooltip + '" data-can="' + response.correctanswers + '" data-wan="' + response.totalquestions + '"  data-cantip="' + response.correctanswerstooltip + '" data-wantip="' + response.wronganswertooltip + '" data-user="' + response.user + '" class="btn btn-primary">Yes</button> <button type="button" id="delete" class="btn btn-danger" data-user="' + response.user + '" style="margin-left:20px;">No</button></p>')

                }

            }
        });
    }
});
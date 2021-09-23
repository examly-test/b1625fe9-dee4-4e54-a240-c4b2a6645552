$(document).ready(function() {
    const token = localStorage.getItem('access-token')
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "GET",
            url: "http://localhost:4000/loadstoredresults?token=" + token + "",
            dataType: "JSON",
            success: function(response) {
                console.log(response);
                $('#loaduserresult').html(response.output)
                for (let i = 0; i < response.data.length; i++) {
                    if (response !== null) {
                        google.charts.load('current', { 'packages': ['corechart'] });
                        google.charts.setOnLoadCallback(drawChart);

                        function drawChart() {
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'heading');
                            data.addColumn('number', 'value');
                            data.addColumn({ type: 'string', role: 'tooltip' });
                            data.addRows([
                                ['Questions unanswered', response.data[i].questionsunanswered, "Questions unanswered: " + (response.data[i].questionsunansweredtooltip).toString()],
                                ['Questions answered', response.data[i].questionsanswered, "Questions answered: " + response.data[i].questionsansweredtooltip.toString()]
                            ]);
                            var options = {
                                tooltip: true
                            };

                            var crctdata = new google.visualization.DataTable();
                            crctdata.addColumn('string', 'heading');
                            crctdata.addColumn('number', 'value');
                            crctdata.addColumn({ type: 'string', role: 'tooltip' });
                            crctdata.addRows([
                                ['Correct answers', response.data[i].correctanswers, "Correct answers: " + (response.data[i].correctanswerstooltip).toString()],
                                ['Wrong Answers', response.data[i].wronganswers, "Wrong Answers: " + (response.data[i].wronganswerstooltip).toString()]
                            ]);
                            var optionscrct = {
                                tooltip: true
                            }
                            var crctchart = new google.visualization.PieChart(document.getElementById('piechartforcorrect' + i));
                            crctchart.draw(crctdata, optionscrct);
                            var chart = new google.visualization.PieChart(document.getElementById('piechart' + i));

                            chart.draw(data, options);
                        }
                    }
                }

            }
        });
    }
});
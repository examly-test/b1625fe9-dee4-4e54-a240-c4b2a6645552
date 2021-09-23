$(document).on('click', '.dropdown-item', (e) => {
    const token = localStorage.getItem('access-token');
    const diff = $(e.currentTarget).text();
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/loadqdataondif?token=" + token + "",
            data: {
                difficulty: diff
            },
            dataType: "JSON",
            success: function(response) {
                console.log(response)
                if (!response.output.status) {
                    $('.dataloadcontainer').html(response.output)
                    var getchapcollclass = document.getElementsByClassName('chapcoll');
                    for (var i = 0; i < getchapcollclass.length; i++) {
                        getchapcollclass[i].setAttribute("href", "#chaptercollapse" + i);
                    }
                    var getchcol = document.getElementsByClassName('chcol');
                    for (var i = 0; i < getchcol.length; i++) {
                        getchcol[i].setAttribute("id", "chaptercollapse" + i);
                    }
                } else {
                    if (response.output.difficulty === 'Hard') {
                        $('.alertinfo').show();
                        $('.alertinfo').html(' <p>The requested difficulty option is not available for some of the subjects would you wish to select other option other than ' + response.output.difficulty + '</p>  <div class="dropdown" style="position: absolute; top: 7px; right: 93px;">' +
                            '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose Your Difficulty</button>' +
                            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Easy</a>' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Medium</a>' +
                            '</div>' +
                            '</div>');
                    } else if (response.output.difficulty === 'Medium') {
                        $('.alertinfo').show();
                        $('.alertinfo').html(' <p>The requested difficulty option is not available for some of the  subjects would you wish to select other option other than ' + response.output.difficulty + '</p>  <div class="dropdown" style="position: absolute; top: 7px; right: 93px;">' +
                            '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose Your Difficulty</button>' +
                            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Easy</a>' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Hard</a>' +
                            '</div>' +
                            '</div>');
                    } else {
                        $('.alertinfo').show();
                        $('.alertinfo').html(' <p>The requested difficulty option is not available for some of the subjects would you wish to select other option other than ' + response.output.difficulty + '</p>  <div class="dropdown" style="position: absolute; top: 7px; right: 93px;">' +
                            '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose Your Difficulty</button>' +
                            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Medium</a>' +
                            '<a class="dropdown-item altchoice" href="#" data-dif="' + response.output.difficulty + '">Hard</a>' +
                            '</div>' +
                            '</div>');
                    }

                }

            }
        });
    }

})
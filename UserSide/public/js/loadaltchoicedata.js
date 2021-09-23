$(document).on('click', '.altchoice', (e) => {
    const alternativeChoice = $(e.currentTarget).text();
    const userdesireddifficulty = $(e.currentTarget).attr('data-dif');
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/loaduseralternativechoice?token=" + token + "",
            data: {
                useraltchoice: alternativeChoice,
                userprefdif: userdesireddifficulty
            },
            dataType: "JSON",
            success: function(response) {
                if (!response.output.status) {
                    $('.alertinfo').hide();
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
                    console.log(response);
                }

            }
        });
    }

});
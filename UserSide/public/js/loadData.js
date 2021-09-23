$(document).ready(function() {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "http://localhost:4000/loadData?token=" + token + "",
                dataType: "JSON",
                success: function(response) {
                    console.log(response)
                    $('.dataloadcontainer').html(response.output)
                    var getchapcollclass = document.getElementsByClassName('chapcoll');
                    for (var i = 0; i < getchapcollclass.length; i++) {
                        getchapcollclass[i].setAttribute("href", "#chaptercollapse" + i);
                    }
                    var getchcol = document.getElementsByClassName('chcol');
                    for (var i = 0; i < getchcol.length; i++) {
                        getchcol[i].setAttribute("id", "chaptercollapse" + i);
                    }
                }
            });
        }, 2000);
    }

});
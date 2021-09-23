$(document).ready((e) => {
    const queryString = window.location.href;
    const token = localStorage.getItem('access-token');
    const urlParams = new URLSearchParams(queryString);
    const subject = urlParams.get('subject');
    const chapter = urlParams.get('chapter');
    const section = urlParams.get('section');
    const difficulty = urlParams.get('difficulty');
    const id = urlParams.get('id');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/getquestions?token=" + token + "",
            data: {
                subject: subject,
                chapter: chapter,
                section: section,
                difficulty: difficulty,
                id: id
            },
            dataType: "JSON",
            success: function(response) {
                if (response.output) {
                    $('.loadcontainer').html(response.output);
                } else {
                    $('.loadcontainer').html(response.status);
                }
            }
        });
    }

});
$(document).on('click', '#chapterbtn', (e) => {
    const token = localStorage.getItem('access-token');
    const getHref = $(e.currentTarget).attr('href').split('#')[1];
    const getSub = $(e.currentTarget).attr('data-sub');
    const getDif = $(e.currentTarget).attr('data-dif');
    const getChap = $(e.currentTarget).attr('data-chap');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/getsection?token=" + token + "",
            data: {
                subject: getSub,
                difficulty: getDif,
                chapter: getChap
            },
            dataType: "JSON",
            success: function(response) {
                if (response.output) {
                    $('#' + getHref).html(response.output)
                }
            }
        });
    }

});
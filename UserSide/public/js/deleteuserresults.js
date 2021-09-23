$(document).on('click', '#delete', function(e) {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = 'http://localhost:4000/'
    } else {
        const getuser = $(e.currentTarget).attr('data-user');
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/deleteresult?token=" + token + "",
            data: {
                user: getuser
            },
            dataType: "JSON",
            success: function(response) {
                console.log(response)
                if (response.status === 'deleted') {
                    window.location.href = 'http://localhost:4000/homepage?token=' + token + ''
                } else {
                    alert(response.status)
                }
            }
        });
    }
});
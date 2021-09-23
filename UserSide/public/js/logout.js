$(document).on("click", "#logout", (e) => {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/deleteresult?token=" + token + "",
            dataType: "JSON",
            success: function(response) {
                console.log(response)
                if (response.status === 'deleted') {
                    localStorage.clear();
                    window.location.href = "http://localhost:4000/";
                } else if (response.status === 'notexists') {
                    localStorage.clear();
                    window.location.href = "http://localhost:4000/";
                } else {
                    alert(response.status)
                }
            }
        });

    }

})
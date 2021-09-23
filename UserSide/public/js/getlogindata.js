$(document).on("click", "#login", (e) => {
    const email = $('#logemail').val().trim();
    const pass = $('#password').val().trim();
    $.ajax({
        url: "http://localhost:4000/checkuserexists",
        type: "POST",
        dataType: "JSON",
        data: {
            email: email,
            pass: pass
        },
        success: function(data, textStatus, request) {
            console.log(data)
            if (data.message === "authorised") {
                const token = request.getResponseHeader('access-token');
                localStorage.setItem("access-token", token);
                window.location.href = 'http://localhost:4000/homepage?token=' + token + ''
            } else {
                $('.alertbox').show();
                $('.alertbox').text("User unauthorised");
            }
        }
    })
})
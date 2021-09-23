$(document).on('click', "#signupreg", (e) => {
    const name = $('#name').val().trim();
    const email = $('#signupemail').val().trim();
    const pass = $('#signuppassword').val().trim();
    $.ajax({
        url: "http://localhost:4000/saveuser",
        type: "POST",
        dataType: "JSON",
        data: {
            name: name,
            email: email,
            pass: pass
        },
        success: function(data, textStatus, request) {
            if (data.message === "inserted") {
                const token = request.getResponseHeader('access-token');
                localStorage.setItem("access-token", token);
                window.location.href = 'http://localhost:4000/homepage?token=' + token + ''
            } else {
                $('.alertbox').show();
                $('.alertbox').text("Email already exists")
            }
        }
    })
})
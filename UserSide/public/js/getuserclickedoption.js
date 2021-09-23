$(document).on("click", "input[type='radio']", (e) => {
    const selectedoption = $("input[name='selectoption']:checked").val();
    const token = localStorage.getItem('access-token');
    const getsubject = $(e.currentTarget).attr('data-sub');
    const getchapter = $(e.currentTarget).attr('data-chap');
    const getdifficulty = $(e.currentTarget).attr('data-dif');
    const getsection = $(e.currentTarget).attr('data-sec');
    const getquestion = $(e.currentTarget).attr('data-qn');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/checkanswers?token=" + token + "",
            data: {
                subject: getsubject,
                chapter: getchapter,
                difficulty: getdifficulty,
                section: getsection,
                question: getquestion,
                selectedoption: selectedoption
            },
            dataType: "dataType",
            success: function(response) {

            }
        });
    }

})
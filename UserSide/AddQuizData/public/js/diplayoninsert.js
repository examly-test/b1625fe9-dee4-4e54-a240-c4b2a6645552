$(document).on("click", "#save", e => {
    var difficulty = $("input[name=diff]:checked").val().trim(" ");
    var subject = $("#subject").val().trim(" ");
    var chapter = $("#chapter").val().trim(" ");
    var section = $("#section").val().trim(" ");
    var question = $("#question").val().trim(" ");
    var explanation = $("#explanation").val().trim(" ");
    var options = [];
    var answer = $("input[name=options]:checked")
        .closest("#qac")
        .find("#optionstext")
        .val().trim(" ");
    $("input[id=optionstext]").each(function() {
        options.push($(this).val().trim(" "));
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/insert_quiz_data",
        data: {
            difficulty: difficulty,
            subject: subject,
            chapter: chapter,
            section: section,
            question: question,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
            answer: answer,
            explanation: explanation
        },
        dataType: "JSON",
        success: function(data) {
            if (data.message === "inserted") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/getdata",
                    data: {
                        difficulty: difficulty,
                        subject: subject,
                        chapter: chapter,
                        section: section,
                        question: question,
                        option1: options[0],
                        option2: options[1],
                        option3: options[2],
                        option4: options[3],
                        answer: answer,
                        explanation: explanation
                    },
                    dataType: "JSON",
                    success: function(data) {
                        $(".displayquestions").append(data.output);
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/displaysubjectcard",
                            dataType: "JSON",
                            success: function(data) {
                                if (data.status === "exists") {
                                    $(".displaysubjects").html(data.output);
                                } else {
                                    $(".displaysubjects").html(data.message);
                                }
                            }
                        });
                    }
                });

            } else {
                alert(data.message);
            }

        }
    });
});
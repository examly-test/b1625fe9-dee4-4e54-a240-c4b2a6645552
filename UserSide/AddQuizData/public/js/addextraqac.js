$(document).on("click", "#modsave", e => {
    var extractqacid = $(e.currentTarget).closest(".qaccollapse").attr("id").trim(" ");
    var difficulty = $(e.currentTarget).attr("data-dif").trim(" ");
    var subject = $(".subtitle").text();
    var chapter = $(e.currentTarget).attr("data-chap").trim(" ");

    var section = $(e.currentTarget).attr("data-sec").trim(" ");

    var question = $(e.currentTarget)
        .closest("#topicbody")
        .find("#modquestion")
        .val().trim(" ");
    var explanation = $(e.currentTarget)
        .closest("#topicbody")
        .find("#mexplanation")
        .val().trim(" ");
    var options = [];
    var answer = $(e.currentTarget)
        .closest("#topicbody")
        .find("input[name=modoptions]:checked")
        .closest("#qac")
        .find("#modoptionstext")
        .val().trim(" ");
    $(e.currentTarget)
        .closest("#topicbody")
        .find("input[id=modoptionstext]")
        .each(function() {
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
            var subject = $(".subtitle").text();
            if (data.message === "inserted") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/displayqac",
                    data: {
                        subj: subject,
                        chapter: chapter,
                        section: section,
                        difficulty: difficulty
                    },
                    success: function(data) {
                        if (data.status === "exists") {
                            $("#" + extractqacid).html(data.output);
                        } else {
                            $("#" + extractqacid).append(data.message);
                        }

                    }
                });
            }

        }
    });
});
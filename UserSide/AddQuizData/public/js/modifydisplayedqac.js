$(document).on("click", "#savebtn", e => {
    var getqacid = $(e.currentTarget).closest(".qaccollapse").attr("id").trim(" ");
    var id = $(e.currentTarget).attr("data-id").trim(" ");
    var chapter = $(e.currentTarget).attr("data-chap").trim(" ");
    var section = $(e.currentTarget).attr("data-sec").trim(" ");
    var difficulty = $(e.currentTarget).attr("data-dif").trim(" ");
    var subtext = $(".subtitle").text();
    var moptions = [];
    $(e.currentTarget)
        .closest(".modtopic")
        .find("input[name=mopt]")
        .each(function() {
            moptions.push($(this).val().trim(" ") + "\n");
        });
    var mexplanation = $(e.currentTarget)
        .closest(".modtopic")
        .find("#modexplanation")
        .val().trim(" ");
    var manswer = $(e.currentTarget)
        .closest(".modtopic")
        .find("input[name=moptions]:checked")
        .closest("#qac")
        .find(".moptionstext")
        .val().trim(" ");
    var mchapter = $(e.currentTarget)
        .closest(".modtopic")
        .find("#mchapter")
        .val().trim(" ");
    var msection = $(e.currentTarget)
        .closest(".modtopic")
        .find("#msection")
        .val().trim(" ");
    var mquestion = $(e.currentTarget)
        .closest(".modtopic")
        .find("#mquestion")
        .val().trim(" ");
    var mdifficulty = $(e.currentTarget)
        .closest(".modtopic")
        .find("#difflev")
        .text()
        .slice(16)
        .trim("  ");
    // console.log(subtext + " " + moptions + " " + manswer + " " + mchapter + " " + msection + " " + mdifficulty);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/modifyrecords",
        data: {
            id: id,
            difficulty: mdifficulty,
            subject: subtext,
            chapter: mchapter,
            section: msection,
            question: mquestion,
            option1: moptions[0],
            option2: moptions[1],
            option3: moptions[2],
            option4: moptions[3],
            answer: manswer,
            explanation: mexplanation
        },
        dataType: "JSON",
        success: function(data) {
            if (data.status === "success") {
                var subject = $(".subtitle").text();
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/displayqac",
                    data: {
                        subj: subtext,
                        chapter: chapter,
                        section: section,
                        difficulty: difficulty
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status === "exists") {
                            console.log(data.output);
                            $("#" + getqacid).html(data.output);

                        } else {
                            $("#" + getqacid).html(data.message);
                        }
                    }
                });
            } else {
                console.log(data.status);
            }
        }
    });
});
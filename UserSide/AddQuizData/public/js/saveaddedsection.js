$(document).on("click", "#asec", e => {
    var secdivid = $(e.currentTarget).closest(".seccollapse").attr("id").trim(" ");
    var subject = $(".subtitle").text().trim(" ").trim(" ");
    var curdif = $(e.currentTarget).attr("data-dif").trim(" ");
    var curchap = $(e.currentTarget).attr("data-chap").trim(" ");
    var section = $(e.currentTarget)
        .closest(".axtrsec")
        .find("#exsection1")
        .val().trim(" ");
    var question = $(e.currentTarget)
        .closest(".axtrsec")
        .find("#exquestion1")
        .val().trim(" ");
    var choices = [];
    var explanation = $(e.currentTarget)
        .closest(".axtrsec")
        .find("#exsecexplanation")
        .val().trim(" ");
    $(e.currentTarget)
        .closest(".axtrsec")
        .find("input[id=exoptionstext1]")
        .each(function() {
            choices.push($(this).val().trim(" ") + "\n");
        });
    var answer = $(e.currentTarget)
        .closest(".axtrsec")
        .find("input[name=exoptions1]:checked")
        .closest("#exqac")
        .find("#exoptionstext1")
        .val().trim(" ");
    console.log(
        subject,
        section,
        question,
        choices,
        answer,
        chapter,
        difficulty
    );
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/saveadditionalsectiondata",
        data: {
            difficulty: curdif,
            subject: subject,
            chapter: curchap,
            section: section,
            question: question,
            option1: choices[0],
            option2: choices[1],
            option3: choices[2],
            option4: choices[3],
            answer: answer,
            explanation: explanation
        },
        dataType: "JSON",
        success: function(data) {
            if (data.message === "inserted") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/displaysection",
                    data: {
                        subject: subject,
                        chapter: curchap,
                        difficulty: curdif
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status === "exists") {
                            $("#" + secdivid).html(data.output);
                            $("#" + secdivid).append(
                                ' <br> <a class="btn btn-outline-secondary addxtrasec" id="addsectionbtn" data-dif=' +
                                curdif +
                                " data-chap=" +
                                curchap +
                                ' data-toggle="collapse" href="#addextrasection" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 175px;position: relative;left: 154px;">+</a><br> <div class="additionalsection"  id="addextrasection">  </div>'
                            );
                            var exseccollapselist = document.getElementsByClassName(
                                "additionalsection"
                            );
                            for (var i = 0; i < exseccollapselist.length; i++) {
                                exseccollapselist[i].setAttribute("id", "addextrasection" + i);
                            }
                            var exseccollapsebtn = document.getElementsByClassName(
                                "addxtrasec"
                            );
                            for (var i = 0; i < exseccollapsebtn.length; i++) {
                                exseccollapsebtn[i].setAttribute(
                                    "href",
                                    "#addextrasection" + i
                                );
                            }
                            var collapselist = document.getElementsByClassName("qaccollapse");
                            for (var i = 0; i < collapselist.length; i++) {
                                collapselist[i].setAttribute("id", "collapseQac" + i);
                            }
                            var collapsebtnlist = document.getElementsByClassName("qaccoll");
                            for (var i = 0; i < collapsebtnlist.length; i++) {
                                collapsebtnlist[i].setAttribute("href", "#collapseQac" + i);
                            }
                        }
                    }
                });
            } else {
                alert(data.message);
            }

        }
    });
});
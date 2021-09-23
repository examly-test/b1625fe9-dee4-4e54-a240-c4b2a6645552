$(document).on("click", "#achap", e => {
    var extractchapdivid = $(e.currentTarget).closest(".difcol").attr("id").trim(" ");
    var curdif = $(e.currentTarget).attr("data-id").trim(" ");
    var subject = $(".subtitle").text().trim(" ");
    var chapter = $(e.currentTarget)
        .closest(".axtrchap")
        .find("#exchapter")
        .val().trim(" ");
    var section = $(e.currentTarget)
        .closest(".axtrchap")
        .find("#exsection")
        .val().trim(" ");
    var question = $(e.currentTarget)
        .closest(".axtrchap")
        .find("#exquestion")
        .val().trim(" ");
    var choices = [];
    var explanation = $(e.currentTarget)
        .closest(".axtrchap")
        .find("#exchapexplanation")
        .val().trim(" ");
    $(e.currentTarget)
        .closest(".axtrchap")
        .find("input[id=exoptionstext]")
        .each(function() {
            choices.push($(this).val().trim(" ") + "\n");
        });
    var answer = $(e.currentTarget)
        .closest(".axtrchap")
        .find("input[name=exoptions]:checked")
        .closest("#exqac")
        .find("#exoptionstext")
        .val().trim(" ");
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/saveadditionalchapterdata",
        data: {
            difficulty: curdif,
            subject: subject,
            chapter: chapter,
            section: section,
            question: question,
            option1: choices[0],
            option2: choices[1],
            option3: choices[2],
            option4: choices[3],
            answer: answer,
            explanation: explanation
        },
        dataType: "json",
        success: function(data) {
            if (data.message === "inserted") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/displaychapter",
                    data: {
                        subject: subject,
                        difficulty: curdif
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status === "exists") {
                            $("#" + extractchapdivid).html(data.output);
                            $("#" + extractchapdivid).append(
                                ' <br> <a class="btn btn-outline-warning addxtrachap" id="addchapterbtn" data-id=' +
                                curdif +
                                ' data-toggle="collapse" href="#addextrachapter" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 238px;position: relative;left: 122px;">+</a><br> <div class="additionalchapter"  id="addextrachapter">  </div>'
                            );
                            var excollapselist = document.getElementsByClassName(
                                "addxtrachap"
                            );
                            for (var i = 0; i < excollapselist.length; i++) {
                                excollapselist[i].setAttribute("href", "#addextrachapter" + i);
                            }
                            var excollapsebtn = document.getElementsByClassName(
                                "additionalchapter"
                            );
                            for (var i = 0; i < excollapsebtn.length; i++) {
                                excollapsebtn[i].setAttribute("id", "addextrachapter" + i);
                            }
                            var collapselist = document.getElementsByClassName("seccollapse");
                            for (var i = 0; i < collapselist.length; i++) {
                                collapselist[i].setAttribute("id", "collapseSection" + i);
                            }
                            var collapsebtnlist = document.getElementsByClassName(
                                "sectioncoll"
                            );
                            for (var i = 0; i < collapsebtnlist.length; i++) {
                                collapsebtnlist[i].setAttribute("href", "#collapseSection" + i);
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
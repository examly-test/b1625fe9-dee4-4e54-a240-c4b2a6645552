$(document).on("click", "#delbtn", e => {
    var extractdelchap = $(e.currentTarget).attr("data-chap").trim(" ");
    var extractdelsec = $(e.currentTarget).attr("data-sec").trim(" ");
    var extractdeldif = $(e.currentTarget).attr("data-dif").trim(" ");
    var extractqacid = $(e.currentTarget)
        .closest(".qaccollapse")
        .attr("id")
        .trim(" ");
    var extractdelchapdivid = $(e.currentTarget)
        .closest(".difcol")
        .attr("id")
        .trim(" ");
    var extractdelsecdivid = $(e.currentTarget)
        .closest(".seccollapse")
        .attr("id")
        .trim(" ");
    var subject = $(".subtitle").text().trim(" ");
    var delid = $(e.currentTarget).attr("data-id").trim(" ");
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/deleterecords",
        data: {
            id: delid
        },
        dataType: "JSON",
        success: function(data) {
            if (data.status === "deleted") {
                var subject = $(".subtitle").text();
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/checkifdataexists",
                    data: {
                        sub: subject
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status === "dataexists") {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3000/displayqac",
                                data: {
                                    difficulty: extractdeldif,
                                    subj: subject,
                                    chapter: extractdelchap,
                                    section: extractdelsec
                                },
                                dataType: "JSON",
                                success: function(data) {
                                    if (data.status === "exists") {
                                        $("#" + extractqacid).html(data.output);
                                    } else {
                                        $.ajax({
                                            type: "POST",
                                            url: "http://localhost:3000/displaysection",
                                            data: {
                                                subject: subject,
                                                chapter: extractdelchap,
                                                difficulty: extractdeldif
                                            },
                                            dataType: "JSON",
                                            success: function(data) {
                                                if (data.status === "exists") {
                                                    console.log("1110");
                                                    $("#" + extractdelsecdivid).html(data.output);
                                                    $("#" + extractdelsecdivid).append(
                                                        ' <br> <a class="btn btn-outline-secondary addxtrasec" id="addsectionbtn" data-dif="' +
                                                        extractdeldif +
                                                        '" data-chap="' +
                                                        extractdelchap +
                                                        '" data-toggle="collapse" href="#addextrasection" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 175px;position: relative;left: 154px;">+</a><br> <div class="additionalsection"  id="addextrasection">  </div>'
                                                    );
                                                    var exseccollapselist = document.getElementsByClassName(
                                                        "additionalsection"
                                                    );
                                                    for (var i = 0; i < exseccollapselist.length; i++) {
                                                        exseccollapselist[i].setAttribute(
                                                            "id",
                                                            "addextrasection" + i
                                                        );
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
                                                    var collapselist = document.getElementsByClassName(
                                                        "qaccollapse"
                                                    );
                                                    for (var i = 0; i < collapselist.length; i++) {
                                                        collapselist[i].setAttribute(
                                                            "id",
                                                            "collapseQac" + i
                                                        );
                                                    }
                                                    var collapsebtnlist = document.getElementsByClassName(
                                                        "qaccoll"
                                                    );
                                                    for (var i = 0; i < collapsebtnlist.length; i++) {
                                                        collapsebtnlist[i].setAttribute(
                                                            "href",
                                                            "#collapseQac" + i
                                                        );
                                                    }
                                                } else {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "http://localhost:3000/displaychapter",
                                                        data: {
                                                            subject: subject,
                                                            difficulty: extractdeldif
                                                        },
                                                        dataType: "JSON",
                                                        success: function(data) {
                                                            console.log(data);
                                                            if (data.status === "exists") {
                                                                $("#" + extractdelchapdivid).html(data.output);
                                                                $("#" + extractdelchapdivid).append(
                                                                    ' <br> <a class="btn btn-outline-warning addxtrachap" id="addchapterbtn" data-id="' +
                                                                    extractdeldif +
                                                                    '" data-toggle="collapse" href="#addextrachapter" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 238px;position: relative;left: 122px;">+</a><br> <div class="additionalchapter"  id="addextrachapter">  </div>'
                                                                );

                                                                var excollapselist = document.getElementsByClassName(
                                                                    "addxtrachap"
                                                                );
                                                                for (
                                                                    var i = 0; i < excollapselist.length; i++
                                                                ) {
                                                                    excollapselist[i].setAttribute(
                                                                        "href",
                                                                        "#addextrachapter" + i
                                                                    );
                                                                }
                                                                var excollapsebtn = document.getElementsByClassName(
                                                                    "additionalchapter"
                                                                );
                                                                for (var i = 0; i < excollapsebtn.length; i++) {
                                                                    excollapsebtn[i].setAttribute(
                                                                        "id",
                                                                        "addextrachapter" + i
                                                                    );
                                                                }

                                                                var collapselist = document.getElementsByClassName(
                                                                    "seccollapse"
                                                                );
                                                                for (var i = 0; i < collapselist.length; i++) {
                                                                    collapselist[i].setAttribute(
                                                                        "id",
                                                                        "collapseSection" + i
                                                                    );
                                                                }
                                                                var collapsebtnlist = document.getElementsByClassName(
                                                                    "sectioncoll"
                                                                );
                                                                for (
                                                                    var i = 0; i < collapsebtnlist.length; i++
                                                                ) {
                                                                    collapsebtnlist[i].setAttribute(
                                                                        "href",
                                                                        "#collapseSection" + i
                                                                    );
                                                                }
                                                            } else {
                                                                console.log("1151");
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: "/quiz/admin/displaydifficulty.php",
                                                                    data: {
                                                                        sub: $(".subtitle").text().trim(" ")
                                                                    },
                                                                    dataType: "JSON",
                                                                    success: function(data) {
                                                                        if (data.status === "notempty") {
                                                                            console.log("1160");
                                                                            $(".retall").html(data.output);
                                                                            var collapselist = document.getElementsByClassName(
                                                                                "collapse"
                                                                            );
                                                                            for (
                                                                                var i = 0; i < collapselist.length; i++
                                                                            ) {
                                                                                collapselist[i].setAttribute(
                                                                                    "id",
                                                                                    "collapseExample" + i
                                                                                );
                                                                            }
                                                                            var collapsebtnlist = document.getElementsByClassName(
                                                                                "abc"
                                                                            );
                                                                            for (
                                                                                var i = 0; i < collapsebtnlist.length; i++
                                                                            ) {
                                                                                collapsebtnlist[i].setAttribute(
                                                                                    "href",
                                                                                    "#collapseExample" + i
                                                                                );
                                                                            }
                                                                        } else {
                                                                            $(".retall").html(" ");
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            $(".retall").html(" ");
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
                    }
                });
            } else {
                console.log(data);
            }
        }
    });
});
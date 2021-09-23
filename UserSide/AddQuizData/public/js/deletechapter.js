$(function() {
    var chap;
    var predif;
    var extractdiv;
    $(document).on("contextmenu", "#chapterbtn", function(e) {
        extractdiv = $(e.currentTarget).closest(".difcol").attr("id").trim(" ");
        predif = $(e.currentTarget).attr("data-diffic").trim(" ");
        chap = $(e.currentTarget).text().trim(" ");
    });

    $.contextMenu({
        selector: "#chapterbtn",
        callback: function(key, opt) {
            console.log(predif);
            var subject = $(".subtitle").text();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/deletechapter",
                data: {
                    sub: subject,
                    diff: predif,
                    chapter: chap
                },
                dataType: "JSON",
                success: function(data) {
                    if (data.status === "deleted") {
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
                                        url: "http://localhost:3000/displaychapter",
                                        data: {
                                            subject: subject,
                                            difficulty: predif
                                        },
                                        dataType: "JSON",
                                        success: function(data) {
                                            console.log(data);
                                            if (data.status === "exists") {
                                                $("#" + extractdiv).html(data.output);
                                                $("#" + extractdiv).append(
                                                    ' <br> <a class="btn btn-outline-warning addxtrachap" id="addchapterbtn" data-id="' +
                                                    predif +
                                                    '" data-toggle="collapse" href="#addextrachapter" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 238px;position: relative;left: 122px;">+</a><br> <div class="additionalchapter"  id="addextrachapter">  </div>'
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
                                                for (var i = 0; i < collapsebtnlist.length; i++) {
                                                    collapsebtnlist[i].setAttribute(
                                                        "href",
                                                        "#collapseSection" + i
                                                    );
                                                }
                                            } else {
                                                $.ajax({
                                                    type: "POST",
                                                    url: "http://localhost:3000/displaydifficulty",
                                                    data: {
                                                        sub: $(".subtitle").text()
                                                    },
                                                    dataType: "JSON",
                                                    success: function(data) {
                                                        if (data.status === "exits") {
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
                                } else {
                                    $.ajax({
                                        type: "GET",
                                        url: "http://localhost:3000/displaysubjectcard",
                                        dataType: "JSON",
                                        success: function(data) {
                                            if (data.status === "exists") {
                                                $(".displaysubjects").html(data.output);
                                            } else {
                                                $(".retall").html(" ");
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
        },
        items: {
            delete: {
                name: "Delete",
                icon: "delete",

            }
        }
    });
})
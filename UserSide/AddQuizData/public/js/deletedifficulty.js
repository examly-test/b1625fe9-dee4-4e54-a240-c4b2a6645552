$(function() {
    var dif;
    $(document).on("contextmenu", "#diffbtn", function(e) {
        dif = $(e.currentTarget).text().trim();
    });
    $.contextMenu({
        selector: "#diffbtn",
        callback: function(key, opt) {
            var subject = $(".subtitle").text();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/deletedifficulty",
                data: {
                    sub: subject,
                    diff: dif
                },
                dataType: "json",
                success: function(data) {
                    if (data.status === "deleted") {
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3000/checkifdataexists",
                            data: {
                                sub: subject
                            },
                            dataType: "json",
                            success: function(data) {
                                if (data.status === "dataexists") {
                                    $.ajax({
                                        type: "POST",
                                        url: "http://localhost:3000/displaydifficulty",
                                        data: {
                                            sub: $(".subtitle").text()
                                        },
                                        dataType: "JSON",
                                        success: function(data) {
                                            if (data.status === "exists") {
                                                $(".retall").html(data.output);
                                                var collapselist = document.getElementsByClassName("collapse");
                                                for (var i = 0; i < collapselist.length; i++) {
                                                    collapselist[i].setAttribute("id", "collapseExample" + i);
                                                }
                                                var collapsebtnlist = document.getElementsByClassName("abc");
                                                for (var i = 0; i < collapsebtnlist.length; i++) {
                                                    collapsebtnlist[i].setAttribute("href", "#collapseExample" + i);
                                                }
                                            } else {
                                                $(".retall").html(" ");
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
});
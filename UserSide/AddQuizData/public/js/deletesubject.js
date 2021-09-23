$(function() {
    var sub;
    $(document).on("contextmenu", "#sub", function(e) {
        sub = $(e.currentTarget).text().trim();
    });

    $.contextMenu({
        selector: "#sub",
        callback: function(key, opt) {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/deletesubject",
                data: {
                    subject: sub
                },
                dataType: "json",
                success: function(data) {
                    if (data.status === "deleted") {
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
        },
        items: {
            delete: {
                name: "Delete",
                icon: "delete",

            }
        }
    });
})
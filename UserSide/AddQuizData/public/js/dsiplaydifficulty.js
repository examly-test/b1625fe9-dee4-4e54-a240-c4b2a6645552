$(document).on("click", "#sub", e => {
    var subject_to_display = $(e.currentTarget).attr("data-id");
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/displaydifficulty",
        data: {
            sub: subject_to_display
        },
        dataType: "JSON",
        success: function(data) {
            if (data.status === "exists") {
                $(".retall").html(data.output);
                $(".subtitle").html(subject_to_display);
                var collapselist = document.getElementsByClassName("collapse");
                for (var i = 0; i < collapselist.length; i++) {
                    collapselist[i].setAttribute("id", "collapseExample" + i);
                }
                var collapsebtnlist = document.getElementsByClassName("abc");
                for (var i = 0; i < collapsebtnlist.length; i++) {
                    collapsebtnlist[i].setAttribute("href", "#collapseExample" + i);
                }
            } else {
                $(".retall").html(data.message);
            }

        }
    });
});
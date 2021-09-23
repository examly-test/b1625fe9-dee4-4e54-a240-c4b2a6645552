$(document).on("click", "#diffbtn", e => {
    var subject = $(".subtitle").text().trim(" ");
    var difficulty = $(e.currentTarget).attr("data-dif");
    var chapdivid = $(e.currentTarget).attr("href").substring(1);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/displaychapter",
        data: {
            subject: subject,
            difficulty: difficulty
        },
        dataType: "JSON",
        success: function(data) {
            if (data.status === "exists") {
                $("#" + chapdivid).html(data.output);
                $("#" + chapdivid).append(
                    ' <br> <a class="btn btn-outline-warning addxtrachap" id="addchapterbtn" data-id=' +
                    difficulty +
                    ' data-toggle="collapse" href="#addextrachapter" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 238px;position: relative;left: 122px;">Add Chapter +</a><br> <div class="additionalchapter"  id="addextrachapter">  </div>'
                );
                var excollapselist = document.getElementsByClassName("addxtrachap");
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
                var collapsebtnlist = document.getElementsByClassName("sectioncoll");
                for (var i = 0; i < collapsebtnlist.length; i++) {
                    collapsebtnlist[i].setAttribute("href", "#collapseSection" + i);
                }
            } else {
                $("#" + chapdivid).html(data.message);
            }

        }
    });
});
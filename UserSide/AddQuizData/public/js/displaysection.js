$(document).on("click", "#chapterbtn", e => {
    var subject = $(".subtitle").text().trim(" ");
    var curdif = $(e.currentTarget).attr("data-diffic").trim(" ");
    var chapter = $(e.currentTarget).text().trim(" ");
    var bufferchap = chapter;
    var ctxsecdivid = $(e.currentTarget).attr("href").substring(1);
    var chdivid = $(e.currentTarget).attr("href").substring(1);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/displaysection",
        data: {
            subject: subject,
            chapter: chapter,
            difficulty: curdif
        },
        dataType: "JSON",
        success: function(data) {
            if (data.status === "exists") {
                $("#" + chdivid).html(data.output);
                $("#" + chdivid).append(
                    ' <br> <a class="btn btn-outline-secondary addxtrasec" id="addsectionbtn" data-dif=' +
                    curdif +
                    " data-chap=" +
                    bufferchap +
                    ' data-toggle="collapse" href="#addextrasection" role="button" aria-expanded="false" aria-controls="collapseExample"  style="width: 175px;position: relative;left: 154px;">Add Section +</a><br> <div class="additionalsection"  id="addextrasection">  </div>'
                );
                var exseccollapselist = document.getElementsByClassName(
                    "additionalsection"
                );
                for (var i = 0; i < exseccollapselist.length; i++) {
                    exseccollapselist[i].setAttribute("id", "addextrasection" + i);
                }
                var exseccollapsebtn = document.getElementsByClassName("addxtrasec");
                for (var i = 0; i < exseccollapsebtn.length; i++) {
                    exseccollapsebtn[i].setAttribute("href", "#addextrasection" + i);
                }
                var collapselist = document.getElementsByClassName("qaccollapse");
                for (var i = 0; i < collapselist.length; i++) {
                    collapselist[i].setAttribute("id", "collapseQac" + i);
                }
                var collapsebtnlist = document.getElementsByClassName("qaccoll");
                for (var i = 0; i < collapsebtnlist.length; i++) {
                    collapsebtnlist[i].setAttribute("href", "#collapseQac" + i);
                }
            } else {
                $("#" + chdivid).html(data.message);
            }

        }
    });
});
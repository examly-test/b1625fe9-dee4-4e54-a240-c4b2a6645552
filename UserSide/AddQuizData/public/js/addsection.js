$(document).on("click", "#addsectionbtn", e => {
    var secdivid = $(e.currentTarget).closest(".seccollapse").attr("id").trim(" ");
    var dtdif = $(e.currentTarget).attr("data-dif").trim(" ");
    var dtchap = $(e.currentTarget).attr("data-chap").trim(" ");
    var exscdiv = $(e.currentTarget).attr("href").substring(1);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/addsection",
        data: {
            difficulty: dtdif,
            chapter: dtchap
        },
        success: function(data) {
            $("#" + secdivid).html(data.output);
        }
    });
});
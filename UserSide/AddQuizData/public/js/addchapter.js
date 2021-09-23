$(document).on("click", "#addchapterbtn", e => {
    var extractchapdivid = $(e.currentTarget).closest(".difcol").attr("id").trim(" ");
    var currentdif = $(e.currentTarget).attr("data-id").trim(" ");
    var exchdiv = $(e.currentTarget).attr("href").substring(1);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/addchapter",
        data: {
            difficulty: currentdif
        },
        dataType: "JSON",
        success: function(data) {
            $("#" + extractchapdivid).html(data.output);
        }
    });
});
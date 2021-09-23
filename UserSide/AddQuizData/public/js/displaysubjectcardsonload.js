$(document).ready(e => {
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
});
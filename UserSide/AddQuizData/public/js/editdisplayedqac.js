$(document).on("click", "#editbtn", e => {
    e.preventDefault();
    $(e.currentTarget)
        .closest(".modtopic")
        .find("#mquestion")
        .prop("disabled", false);
    $(e.currentTarget)
        .closest(".modtopic")
        .find(".moptionstext")
        .prop("disabled", false);
    $(e.currentTarget)
        .closest(".modtopic")
        .find(".manswer")
        .prop("disabled", false);
    $(e.currentTarget)
        .closest(".modtopic")
        .find("#modexplanation")
        .prop("disabled", false);
    $(e.currentTarget).closest(".modtopic").find("#savebtn").show();
});
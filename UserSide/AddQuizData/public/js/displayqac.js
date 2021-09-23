  $(document).on("click", "#sectionbtn", e => {
      var subject = $(".subtitle").text().trim(" ");
      var section = $(e.currentTarget).text().trim(" ");
      var secdivid = $(e.currentTarget).attr("href").substring(1);
      $.ajax({
          type: "POST",
          url: "http://localhost:3000/displayqac",
          data: {
              subj: subject,
              chapter: $(e.currentTarget).attr("data-chapt"),
              section: section,
              difficulty: $(e.currentTarget).attr("data-diffic")
          },
          dataType: "JSON",
          success: function(data) {
              if (data.status === "exists") {
                  console.log(data.output);
                  $("#" + secdivid).html(data.output);

              } else {
                  $("#" + secdivid).html(data.message);
              }
          }
      });
  });
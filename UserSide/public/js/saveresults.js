$(document).on('click', '#save', (e) => {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        const listdataArr = [];
        var getlistdata = document.getElementsByClassName('lgi');
        
        //checking for sonar cloud
        if (getlistdata !== '' || getlistdata !== undefined) {
        }
        if (getlistdata !== '' || getlistdata !== undefined) {
            for (let index = 0; index < getlistdata.length; index++) {
                listdataArr.push(getlistdata[index].textContent)
            }
            const getquestionsunanswered = $(e.currentTarget).attr('data-qnun');
            const getquestionsanswered = $(e.currentTarget).attr('data-qnan');
            const getquestionsunansweredtip = $(e.currentTarget).attr('data-qnuntip');
            const getquestionsansweredtip = $(e.currentTarget).attr('data-qnantip');
            const getcorrectanswers = $(e.currentTarget).attr('data-can');
            const getwronganswers = $(e.currentTarget).attr('data-wan');
            const getcorrectanswerstip = $(e.currentTarget).attr('data-cantip');
            const getwronganswerstip = $(e.currentTarget).attr('data-wantip');
            const getuser = $(e.currentTarget).attr('data-user');
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/saveuserresults?token=" + token + "",
                data: {
                    questionsunanswered: getquestionsunanswered,
                    questionsanswered: getquestionsanswered,
                    questionsunansweredtooltip: getquestionsunansweredtip,
                    questionsansweredtooltip: getquestionsansweredtip,
                    correctanswers: getcorrectanswers,
                    wronganswers: getwronganswers,
                    correctanswerstooltip: getcorrectanswerstip,
                    wronganswerstooltip: getwronganswerstip,
                    user: getuser,
                    userwronganswers: listdataArr,
                    datecreated: new Date()
                },
                dataType: "JSON",
                success: function(response) {
                    if (response.status === 'success') {
                        window.location.href = "http://localhost:4000/homepage?token=" + token + ""
                    } else {
                        console.log(response)
                    }
                }
            });
        }

    }


});



/* <button type="button" id="save" data-qnun="33.33333333333334" data-qnan="66.66666666666666" data-qnuntip="2" data-qnantip="4" data-can="16.666666666666664" data-wan="83.33333333333334" data-cantip="1" data-wantip="5" data-user="noel.nik3@gmail.com" class="btn btn-primary">Yes</button>*/

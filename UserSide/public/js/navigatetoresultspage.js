$(document).on('click', '#checkresults', (e) => {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        const getnoqn = $(e.currentTarget).attr('data-noqn');
        console.log("from results page: " + getnoqn)
        window.location.href = "http://localhost:4000/result?token=" + token + "&no=" + getnoqn + ""
    }
});
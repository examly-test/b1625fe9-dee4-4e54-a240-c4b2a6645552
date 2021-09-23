$(document).on('click', '#vsr', (e) => {
    const token = localStorage.getItem('access-token');
    if (!token) {
        window.location.href = "http://localhost:4000/"
    } else {
        window.location.href = "http://localhost:4000/storedresults?token=" + token + ""
    }
});
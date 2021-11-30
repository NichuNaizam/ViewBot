function showLoginMenu() {
    document.getElementById('token-input').value = '';

    document.getElementById('login-panel').style.visibility = 'visible';
    document.getElementById('navbar').style.visibility = 'hidden';
}

function hideLoginMenu() {
    document.getElementById('login-panel').style.visibility = 'hidden';
    document.getElementById('navbar').style.visibility = 'visible';
}
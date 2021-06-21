// Local API server URL: http://localhost:7000
// Cloud API server URL: https://where-its-at.herokuapp.com

const API_URL = 'https://where-its-at.herokuapp.com'

const submitLoginBtn = document.querySelector('#admin-submit');
const adminUsernameInput = document.querySelector('#admin-username');
const adminPasswordInput = document.querySelector('#admin-password');

submitLoginBtn.addEventListener('click', async () => {
    const user = adminUsernameInput.value;
    const pass = adminPasswordInput.value;

    let login = await signIn(user, pass);

    if (login.success && login.role === 'admin') {
        setSessionToken(login.token);
        signedIn()
    } else {
        alert('Incorrect username or password')
    }
});

async function setSessionToken(token) {
    sessionStorage.setItem('auth', token);
}

 function getSessionToken() {
    return sessionStorage.getItem('auth');
}

async function signIn(username, password) {    
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(API_URL + '/api/admin', { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } 
    });
    const data = await response.json();
    return await data;
}

async function signedIn() {
    const token = await getSessionToken();

    const response = await fetch(API_URL + '/api/admin/login', { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    
    if (data.loginSuccess) {
        location.href = API_URL + '/loggedin-admin.html';
    } 
}
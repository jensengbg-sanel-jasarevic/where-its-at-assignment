const urlLocal = 'http://localhost:7000';
const urlCloud = 'https://where-its-at.herokuapp.com'    

const submitLoginBtn = document.querySelector('#staff-submit');
const staffUsernameInput = document.querySelector('#staff-username');
const staffPasswordInput = document.querySelector('#staff-password');

submitLoginBtn.addEventListener('click', async () => {
    const user = staffUsernameInput.value;
    const pass = staffPasswordInput.value;

    let login = await signIn(user, pass);
    
    if (login.success && login.role === 'staff') {
        setSessionToken(login.token);
        signedIn();
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

    const response = await fetch(urlCloud + '/api/staff', { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } 
    });
    const data = await response.json();
    return await data;
}

async function signedIn() {
    const token = await getSessionToken();

    const response = await fetch(urlCloud + '/api/staff/login', { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    
    if (data.loginSuccess) {
        location.href = urlCloud + '/staff-verify.html';
    } 
}
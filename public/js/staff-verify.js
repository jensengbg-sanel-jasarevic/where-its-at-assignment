    const verifyButton = document.getElementById('verify-submit')
    signedIn();

    verifyButton.addEventListener('click', async () => {
        const inputTicketNumber = document.getElementById('verify-ticketnumber').value
    
        const ticketObj =  {
            ticketNumber: inputTicketNumber
        };
    
        const response = await fetch('http://localhost:7000/api/staff/verifyticket', { 
            method: 'POST',
            body: JSON.stringify(ticketObj),
            headers: { 'Content-Type': 'application/json' }}
        );
        const data = await response.json();

        if (data.success) {
            alert ('Ticket verified');
        }
        else if (data.ticket && data.success !== true) {
            alert ('Ticket has already been verified');
        }
        else {
            alert ('Non existing ticket number');
        };
    });

    function getSessionToken() {
        return sessionStorage.getItem('auth');
    } 

    async function signedIn() {
        const token = getSessionToken();
        const url = 'http://localhost:7000/api/staff/login';
    
        const response = await fetch(url, { 
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            } 
        });
        const data = await response.json();
    
        if (!data.loginSuccess) {
            location.href = 'http://localhost:7000/login-staff.html'
        } 
    };
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showSignup').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('formContainer').classList.add('signup');
    });

    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('formContainer').classList.remove('signup');
    });
});

const usernames = ['JohnPatrick', 'Rachel', 'MonicaFe'];
const passwords = ['pass1234', 'alimana123', 'viella123'];

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedin');
    const username = localStorage.getItem('username');
    if (isLoggedIn) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('welcomeMessage').classList.remove('hidden');
        document.getElementById('userDisplay').textContent = username;
        document.getElementById('formContainer').classList.remove('signup');
    } else {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('welcomeMessage').classList.add('hidden');
    }
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let validCredentials = false;

    for (let i = 0; i < usernames.length; i++) {
        if (username === usernames[i] && password === passwords[i]) {
            validCredentials = true;
            break;
        }
    }

    if (validCredentials) {
        localStorage.setItem('loggedin', 'true');
        localStorage.setItem('username', username);
        checkLoginStatus();
    } else {
        alert('Invalid login credentials');
    }
}

function logout() {
    localStorage.removeItem('loggedin');
    localStorage.removeItem('username');
    checkLoginStatus();
}

// Event listeners
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('showSignup').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
});
document.getElementById('showLogin').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

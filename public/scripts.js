document.getElementById('login-link').addEventListener('click', function() {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Logged in successfully!');
        } else {
            alert('Login failed!');
        }
    });
});

document.getElementById('submission-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to submit the form!');
        return;
    }

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.redirect) {
            window.location.href = data.redirect;
        }
    });
});

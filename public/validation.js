document.getElementById('submission-form').addEventListener('submit', function(event) {
    let valid = true;
    const password = document.getElementById('password').value;
    const passwordError = document.querySelector('#password + .error-message');

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    if (!valid) {
        event.preventDefault();
    }
});

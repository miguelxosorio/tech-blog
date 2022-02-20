async function signupForm (event) {
    event.preventDefault();

    // assigning the values of the input into these variables, removing whitespaces
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if all these fields are true, make the post request
    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check response status
        if(response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupForm);
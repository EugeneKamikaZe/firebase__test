export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="question-input">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="pass" required>
                <label for="pass">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="enter-btn">Enter</button>
        </form>
    `
}

export function authWithEmailAndPass(email, password) {
    const apiKey = 'AIzaSyBDi2jbZ1BiwU7Wf817lpbHzcDffsZqJB0'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,              //email: email, password: password
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}
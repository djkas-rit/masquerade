const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
const NavbarComponent = require('./Navbar.jsx').default;

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or passowrd is empty!')
        return false;
    };

    helper.sendPost(e.target.action, { username, pass });
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!')
        return false;
    };

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    };

    helper.sendPost(e.target.action, { username, pass, pass2 });

    return false;
}

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username:</label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password:</label>
            <input id="pass" type="text" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
}

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username:</label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password:</label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password:</label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('app'));

    const renderLogin = () => {
        root.render(
            <>
                <NavbarComponent isLoggedIn={false} />
                <div id="content">
                    <h1>Log in</h1>
                    <LoginWindow />
                </div>
            </>
        );
    };

    const renderSignup = () => {
        root.render(
            <>
                <NavbarComponent isLoggedIn={false} />
                <div id="content">
                    <h1>Sign up</h1>
                    <SignupWindow />
                </div>
            </>
        );
    };

    root.render(
        <>
            <NavbarComponent isLoggedIn={false} />
            <div id="content">
                <h1>Log in</h1>
                <LoginWindow />
            </div>
        </>
    );

    setTimeout(() => {
        const loginButton = document.getElementById('loginButton');
        const signupButton = document.getElementById('signupButton');

        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            renderLogin();
            return false;
        });

        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            renderSignup();
            return false;
        });
    }, 0);
};

window.onload = init;
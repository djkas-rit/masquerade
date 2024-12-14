const React = require('react');
const { createRoot } = require('react-dom/client');
const PasswordChangeForm = require('./PasswordChangeForm.jsx').default;
const PersonaList = require('./list.jsx').default;
const NavbarComponent = require('./Navbar.jsx').default;

const AccountPage = () => (
  <div>
    <h1>Your Account</h1>
    <h2>Your Personas</h2>
    <PersonaList />
    <button>
        <a href="/maker">Create a new Persona</a>
    </button>

    <hr />
    <h2>Settings</h2>
    <h3>Change Password</h3>
    <PasswordChangeForm />
  </div>
);

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(
    <>
      <NavbarComponent isLoggedIn={true} />
      <div id="content">
        <AccountPage />
      </div>
    </>
  );
};

window.onload = init;

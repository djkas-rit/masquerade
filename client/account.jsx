const React = require('react');
const { createRoot } = require('react-dom/client');
const NavbarComponent = require('./Navbar.jsx').default;
const PasswordChangeForm = require('./PasswordChangeForm.jsx').default;
const PersonaList = require('./list.jsx').default;

const getSuscriptionStatus = async () => {
  // get the isPro status for the current user session
  const response = await fetch('/isPro');
  const data = await response.json();
  return data.isPro;
};

const SubscriptionButton = ({isPro}) => {
  const handleSubscription = async () => {
    const url = isPro ? '/unsubscribe' : '/subscribe';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const result = await response.json();
      alert(result.error);
    }
  };

  return (
    <button onClick={handleSubscription}>
      {isPro ? 'Unsubscribe from Pro' : 'Subscribe to Pro'}
    </button>
  );
};

const AccountPage = ({ isPro }) => (
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
    <h3>Subscription</h3>
    <SubscriptionButton isPro={isPro} />
  </div>
);

const init = () => {
  const isPro = getSuscriptionStatus();

  const root = createRoot(document.getElementById('app'));
  
  root.render(
    <>
      <NavbarComponent isLoggedIn={true} />
      <div id="content">
        <AccountPage isPro={isPro} />
      </div>
    </>
  );
};

window.onload = init;

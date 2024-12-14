import React from 'react';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      {isLoggedIn ? (
        <>
          <div className="navlink"><a href="/messages">Messages</a></div>
          <div className="navlink"><a href="/account">My Account</a></div>
          <div className="navlink"><a href="/logout">Logout</a></div>
        </>
      ) : (
        <>
          <div className="navlink"><a id="loginButton" href="/login">Login</a></div>
          <div className="navlink"><a id="signupButton" href="/login">Sign up</a></div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
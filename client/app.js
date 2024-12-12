
import React from 'react';
import ReactDOM from 'react-dom';
import AccountSettings from './AccountSettings';

// ...existing code...

const init = () => {
  // ...existing code...
  if (document.getElementById('accountSettings')) {
    ReactDOM.render(<AccountSettings />, document.getElementById('accountSettings'));
  }
};

window.onload = init;
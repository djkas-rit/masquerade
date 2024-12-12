
import React, { useState } from 'react';
import { createRoot } from 'react-dom';

const PasswordChangeForm = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const response = await fetch('/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPass, newPass, newPass2 }),
    });
    const result = await response.json();
    setMessage(result.message || result.error);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="oldPass">Old Password:</label>
          <input
            type="password"
            id="oldPass"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPass">New Password:</label>
          <input
            type="password"
            id="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPass2">Confirm New Password:</label>
          <input
            type="password"
            id="newPass2"
            value={newPass2}
            onChange={(e) => setNewPass2(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordChangeForm;
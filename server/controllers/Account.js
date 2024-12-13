const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password.' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/messages' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (pass !== pass2) return res.status(400).json({ error: 'Passwords do not match.' });

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

const accountPage = (req, res) => res.render('account');

const changePassword = async (req, res) => {
  const { username } = req.session.account;
  const oldPass = `${req.body.oldPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'New passwords do not match.' });
  }

  return Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong password.' });
    }

    try {
      await Account.changePassword(username, newPass, () => {});
      return res.json({ message: 'Password changed successfully.' });
    } catch (error) {
      return res.status(500).json({ error: `An error occurred: ${error}` });
    }
  });
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  accountSettingsPage: accountPage,
  changePassword,
};

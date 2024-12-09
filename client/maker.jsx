const helper = require('./helper');
const React = require('react');
const { createRoot } = require('react-dom/client');

const submitPersonaData = (e) => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector('#persona-name').value;
  const age = e.target.querySelector('#persona-age').value;
  const level = e.target.querySelector('#persona-level').value;
  const bio = e.target.querySelector('#persona-bio').value;
  const image_url = e.target.querySelector('#persona-image-url').value;
  if (!name || !age || !level || !bio || !image_url) {
    helper.handleError('All fields are required!');
    return false;
  }
  helper.sendPost(e.target.action, { name, age, level, bio, image_url });
  return false;
};

const PersonaForm = () => (
  <form id="persona-form" name="persona-form" onSubmit={submitPersonaData} action="/maker" method="POST" className="main-form">
    <label htmlFor="name">Name:</label>
    <input id="persona-name" type="text" name="name" placeholder="Enter a name" />
    <label htmlFor="age">Age:</label>
    <input id="persona-age" type="number" min="0" name="age" />
    <label htmlFor="level">Level:</label>
    <input id="persona-level" type="number" min="0" max="100" name="level" />
    <label htmlFor="bio">Bio:</label>
    <textarea id="persona-bio" name="bio" placeholder="Enter your bio" />
    <label htmlFor="image_url">Image URL:</label>
    <input id="persona-image-url" type="text" name="image_url" placeholder="Image URL" />
    <input className="form-submit" type="submit" value="Create" />
  </form>
);

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<PersonaForm />);
};

window.onload = init;
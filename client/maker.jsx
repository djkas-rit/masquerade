const helper = require('./helper');
const React = require('react');
const { createRoot } = require('react-dom/client');
const NavbarComponent = require('./Navbar.jsx').default;

const submitPersonaData = (e) => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector('#persona-name').value;
  const nickname = e.target.querySelector('#persona-nickname').value;
  const pronouns = e.target.querySelector('#persona-pronouns').value;
  const age = e.target.querySelector('#persona-age').value;
  const bio = e.target.querySelector('#persona-bio').value;
  const likes = e.target.querySelector('#persona-likes').value;
  const dislikes = e.target.querySelector('#persona-dislikes').value;
  const image_url = e.target.querySelector('#persona-image-url').value;
  if (!name) {
    helper.handleError('A name is required.');
    return false;
  }
  helper.sendPost(e.target.action, { name, nickname, pronouns, age, bio, likes, dislikes, image_url });
  return false;
};

const PersonaForm = () => (
  <form id="persona-form" name="persona-form" onSubmit={submitPersonaData} action="/maker" method="POST" className="main-form">
    <label htmlFor="name">Name:</label>
    <input id="persona-name" type="text" name="name" placeholder="Enter a name" />
    <label htmlFor="nickname">Nickname(s):</label>
    <input id="persona-nickname" type="text" name="nickname" placeholder="Enter nickname(s)" />
    <label htmlFor="pronouns">Pronouns:</label>
    <input id="persona-pronouns" type="text" name="pronouns" placeholder="Enter pronouns" />
    <label htmlFor="age">Age:</label>
    <input id="persona-age" type="number" min="0" name="age" />
    <label htmlFor="bio">Bio:</label>
    <textarea id="persona-bio" name="bio" placeholder="Enter your bio" />
    <label htmlFor="likes">Likes:</label>
    <textarea id="persona-likes" name="likes" placeholder="Enter likes" />
    <label htmlFor="dislikes">Dislikes:</label>
    <textarea id="persona-dislikes" name="dislikes" placeholder="Enter dislikes" />
    <label htmlFor="image_url">Image URL:</label>
    <input id="persona-image-url" type="text" name="image_url" placeholder="Image URL" />
    <input className="form-submit" type="submit" value="Create" />
  </form>
);

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(
    <>
    <NavbarComponent isLoggedIn={true} />
    <div id="content">
      <h1>Create a new character</h1>
      <PersonaForm />
    </div>
    </>
  );
};

window.onload = init;
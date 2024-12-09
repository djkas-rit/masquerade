const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorPopup').classList.remove('hidden');
};

const sendPost = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('errorPopup').classList.add('hidden');

  if(result.redirect) {
    window.location = result.redirect;
  }

  if(result.error) {
    handleError(result.error);
  }

  if (result.message) {
    alert(result.message);
  }
};

const init = () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const personaForm = document.getElementById('persona-form');
  const errorPopup = document.getElementById('error-popup');

  if(signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorPopup.classList.add('hidden');

      const username = signupForm.querySelector('#user').value;
      const pass = signupForm.querySelector('#pass').value;
      const pass2 = signupForm.querySelector('#pass2').value;

      if(!username || !pass || !pass2) {
        handleError('All fields are required!');
        return false;
      } 

      if(pass !== pass2) {
        handleError('Passwords do not match!');
        return false;
      }

      sendPost(signupForm.getAttribute('action'), {username, pass, pass2});
      return false;
    });
  }

  if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorPopup.classList.add('hidden');

      const username = loginForm.querySelector('#user').value;
      const pass = loginForm.querySelector('#pass').value;

      if(!username || !pass) {
        handleError('Username or password is empty!');
        return false;
      }

      sendPost(loginForm.getAttribute('action'), {username, pass});
      return false;
    });
  }

  if(personaForm) {
    personaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorPopup.classList.add('hidden');

      const name = personaForm.querySelector('#persona-name').value;
      const age = personaForm.querySelector('#persona-age').value;

      if(!name || !age) {
        handleError('All fields are required!');
        return false;
      }

      sendPost(personaForm.getAttribute('action'), {name, age});
      return false;
    });
  }
};

window.onload = init;
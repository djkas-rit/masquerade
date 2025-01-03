const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/maker', mid.requiresLogin, controllers.Persona.makerPage);
  app.get('/list', mid.requiresLogin, controllers.Persona.listPage);
  app.get('/getPersonas', mid.requiresLogin, controllers.Persona.getPersonas);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.post('/maker', mid.requiresLogin, controllers.Persona.createPersona);

  app.post('/deletePersona', mid.requiresLogin, controllers.deletePersona);

  app.post('/createMessage', mid.requiresLogin, controllers.Message.createMessage);
  app.get('/getMessages', mid.requiresLogin, controllers.Message.getMessages);
  app.get('/messages', mid.requiresLogin, controllers.Message.messagePage);

  app.get('/account', mid.requiresLogin, controllers.Account.accountSettingsPage);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  app.get('/getProStatus', mid.requiresLogin, controllers.Account.getProStatus);
  app.post('/subscribe', mid.requiresLogin, controllers.Account.subscribe);
  app.post('/unsubscribe', mid.requiresLogin, controllers.Account.unsubscribe);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.notFound);
};

module.exports = router;

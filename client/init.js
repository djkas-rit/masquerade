
const React = require('react');
const { createRoot } = require('react-dom/client');
const MessageForm = require('./messageForm');
const MessageFeed = require('./messageFeed');

const init = () => {
  const messageFormContainer = document.getElementById('messageFormContainer');
  const messageFeedContainer = document.getElementById('messageFeedContainer');

  const personas = JSON.parse(document.getElementById('personasData').textContent);
  const messages = JSON.parse(document.getElementById('messagesData').textContent);

  const formRoot = createRoot(messageFormContainer);
  const feedRoot = createRoot(messageFeedContainer);

  formRoot.render(<MessageForm personas={personas} />);
  feedRoot.render(<MessageFeed messages={messages} />);
};

window.onload = init;
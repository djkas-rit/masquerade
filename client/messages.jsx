const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const NavbarComponent = require('./Navbar.jsx').default;
const MessageForm = require('./messageForm.jsx').default;
const MessageList = require('./messageList.jsx').default;

const MessagePage = () => {
    const [personas, setPersonas] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('/getPersonas')
            .then((res) => res.json())
            .then((data) => setPersonas(data.personas));

        fetch('/getMessages')
            .then((res) => res.json())
            .then((data) => setMessages(data.messages));
    }, []);

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <div id="content">
                <h1>Send a Message</h1>
                <MessageForm personas={personas} />
                <MessageList messages={messages} />
            </div>
        </>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<MessagePage />);
};

window.onload = init;
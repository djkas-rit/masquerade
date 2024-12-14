import React from 'react';

const MessagesList = ({ messages }) => (
    <div id="messageFeed" className="message-feed">
        {messages.map((message) => (
            <div key={message._id} className="message">
                <h3>{message.persona?.name || '[Deleted User]'}</h3>
                <p>{message.content}</p>
                <small>{new Date(message.createdDate).toLocaleString()}</small>
            </div>
        ))}
    </div>
);

export default MessagesList;
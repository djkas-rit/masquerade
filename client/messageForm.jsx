import React, { useState, useEffect } from 'react';

const MessageForm = ({ personas }) => {
    const [content, setContent] = useState('');
    const [persona, setPersona] = useState('');

    useEffect(() => {
        if (personas.length > 0) {
            setPersona(personas[0]._id);
        }
    }, [personas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, persona }),
        }).then(() => {
            setContent('');
        });
    };

    return (
        <form id="messageForm" onSubmit={handleSubmit} className="message-form">
            <label htmlFor="persona">Persona:</label>
            <select id="persona" name="persona" value={persona} onChange={(e) => setPersona(e.target.value)}>
                {personas.map((persona) => (
                    <option key={persona._id} value={persona._id}>{persona.name}</option>
                ))}
            </select>
            <br />
            <label htmlFor="content">Message:</label>
            <textarea id="content" name="content" placeholder="Type as your character..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <br />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;
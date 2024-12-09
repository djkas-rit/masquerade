const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const PersonaList = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const retrievePersonas = async () => {
      const response = await fetch('/getPersonas');
      const data = await response.json();
      setPersonas(data.personas);
    };
    retrievePersonas();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch('/deletePersona', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (result.error) {
      alert(result.error);
    } else {
      alert(result.message);
      window.location.reload();
    }
  };

  if (personas.length === 0) {
    return (
      <div className="persona-list">
        <h3 className="empty-personas">No characters were found.</h3>
      </div>
    );
  }

  const personaCards = personas.map((persona) => {
    return (
      <div key={persona._id} className="persona-card">
        <img src={persona.image_url} alt={persona.name} className="persona-image" />
        <h3 className="persona-name">Name: {persona.name}</h3>
        <h3 className="persona-age">Age: {persona.age}</h3>
        <h3 className="persona-level">Level {persona.level}</h3>
        <h3 className="persona-bio">Bio: {persona.bio}</h3>
        <button onClick={() => handleDelete(persona._id)}>Delete</button>
      </div>
    );
  });

  return <div className="persona-list">{personaCards}</div>;
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<PersonaList />);
};

window.onload = init;
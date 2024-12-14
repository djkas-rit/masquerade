const React = require('react');
const { useState, useEffect } = React;

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
        <h3 className="persona-name">Name: {persona.name}</h3>
        {persona.nickname && <h3 className="persona-nickname">Nickname(s): {persona.nickname}</h3>}
        {persona.pronouns && <h3 className="persona-pronouns">Pronouns: {persona.pronouns}</h3>}
        <h3 className="persona-age">Age: {persona.age}</h3>
        <h3 className="persona-bio">Bio: {persona.bio}</h3>
        {persona.likes && <h3 className="persona-likes">Likes: {persona.likes}</h3>}
        {persona.dislikes && <h3 className="persona-dislikes">Dislikes: {persona.dislikes}</h3>}
        <button onClick={() => handleDelete(persona._id)}>Delete</button>
      </div>
    );
  });

  return <div className="persona-list">{personaCards}</div>;
};

export default PersonaList;
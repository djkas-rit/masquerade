const models = require('../models');

const { Persona } = models;

const makerPage = (req, res) => res.render('maker');
const listPage = (req, res) => res.render('list');

const getPersonas = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    let docs = await Persona.find(query).select('name age level bio image_url _id').lean().exec();

    // assign placeholder values for missing fields
    docs = docs.map((doc) => ({
      _id: doc._id,
      name: doc.name || 'Unknown',
      age: doc.age || '???',
      level: doc.level || 'Unknown',
      bio: doc.bio || 'No bio available',
      image_url: doc.image_url || 'No image available',
    }));

    return res.json({ personas: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred while retrieving characters.' });
  }
};

const createPersona = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.level || !req.body.bio || !req.body.image_url) {
    return res.status(400).json({ error: 'Name, age, level, bio, and image URL are all required.' });
  }

  const personaData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    bio: req.body.bio,
    image_url: req.body.image_url,
    owner: req.session.account._id,
  };

  try {
    const newPersona = new Persona(personaData);
    await newPersona.save();
    return res.status(201).json({
      name: newPersona.name,
      age: newPersona.age,
      level: newPersona.level,
      bio: newPersona.bio,
      image_url: newPersona.image_url,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This character already exists.' });
    }
    return res.status(400).json({ error: 'An error occurred while creating the character.' });
  }
};

const deletePersona = async (req, res) => {
  try {
    console.log(req.body.id);
    await Persona.findByIdAndDelete(req.body.id);
    return res.status(200).json({ message: 'Character deleted successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred while deleting the character.' });
  }
};

module.exports = {
  makerPage,
  listPage,
  getPersonas,
  createPersona,
  deletePersona,
};

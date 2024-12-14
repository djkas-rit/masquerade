const models = require('../models');

const PRO_LIMIT = 5; // max number of characters (inclusive) for non-pro users

const { Persona } = models;

const makerPage = (req, res) => res.render('maker');
const listPage = (req, res) => res.render('list');

const getPersonas = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    let docs = await Persona.find(query).select('name age bio image_url _id').lean().exec();

    // assign placeholder values for missing fields
    docs = docs.map((doc) => ({
      _id: doc._id,
      name: doc.name || 'Unknown',
      age: doc.age || '???',
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
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  const personaCount = await Persona.countDocuments({ owner: req.session.account._id }).exec();
  if (!req.session.account.isPro && personaCount >= PRO_LIMIT) {
    return res.status(403).json({ error: 'Upgrade to Masquerade Pro to create more characters.' });
  }

  const personaData = {
    name: req.body.name,
    nickname: req.body.nickname || '',
    pronouns: req.body.pronouns || '',
    age: req.body.age || null,
    bio: req.body.bio || '',
    likes: req.body.likes || '',
    dislikes: req.body.dislikes || '',
    image_url: req.body.image_url || '',
    owner: req.session.account._id,
  };

  try {
    const newPersona = new Persona(personaData);
    await newPersona.save();
    return res.status(201).json({
      name: newPersona.name,
      nickname: newPersona.nickname,
      pronouns: newPersona.pronouns,
      age: newPersona.age,
      bio: newPersona.bio,
      likes: newPersona.likes,
      dislikes: newPersona.dislikes,
      image_url: newPersona.image_url,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(403).json({ error: 'This character already exists.' });
    }
    return res.status(500).json({ error: 'An error occurred while creating the character.' });
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

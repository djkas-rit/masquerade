const models = require('../models');

const { Message } = models;

const createMessage = async (req, res) => {
  if (!req.body.persona || !req.body.content) {
    return res.status(400).json({ error: 'Persona and content are required.' });
  }

  const messageData = {
    persona: req.body.persona,
    content: req.body.content,
  };

  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    return res.status(201).json({ message: 'Message created successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred while creating the message.' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('persona', 'name').lean().exec();
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred while retrieving messages.' });
  }
};

const messagePage = async (req, res) => {
  try {
    const personas = await models.Persona.find({ owner: req.session.account._id }).lean().exec();
    const messages = await Message.find().populate('persona', 'name').lean().exec();
    return res.render('message', { personas, messages });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred while loading the message page.' });
  }
};

module.exports = {
  createMessage,
  getMessages,
  messagePage,
};

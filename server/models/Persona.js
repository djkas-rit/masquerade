const mongoose = require('mongoose');

const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const PersonaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  nickname: {
    type: String,
  },
  pronouns: {
    type: String,
  },
  age: {
    type: Number,
    min: 0,
  },
  bio: {
    type: String,
  },
  likes: {
    type: String,
  },
  dislikes: {
    type: String,
  },
  image_url: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const PersonaModel = mongoose.model('Persona', PersonaSchema);

PersonaSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  level: doc.level,
  bio: doc.bio,
  image_url: doc.image_url,
});

module.exports = PersonaModel;

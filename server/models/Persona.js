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
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
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

PersonaSchema.statics.deleteById = (id) => {
  const searchId = {
    _id: id,
  };

  return PersonaModel.deleteOne(searchId);
};

module.exports = PersonaModel;

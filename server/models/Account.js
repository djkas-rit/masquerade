const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

let AccountModel = {};

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
});

AccountSchema.statics.toAPI = (doc) => ({
  username: doc.username,
  _id: doc._id,
});

AccountSchema.statics.generateHash = (password) => bcrypt.hash(password, saltRounds);

AccountSchema.statics.authenticate = async (username, password, callback) => {
  try {
    const doc = await AccountModel.findOne({ username }).exec();
    if (!doc) {
      return callback();
    }

    const match = await bcrypt.compare(password, doc.password);
    if (match) {
      return callback(null, doc);
    }
    return callback();
  } catch (err) {
    return callback(err);
  }
};

AccountSchema.statics.changePassword = async (username, newPassword, callback) => {
  try {
    const hash = await AccountModel.generateHash(newPassword);
    await AccountModel.findOneAndUpdate({ username }, { password: hash }).exec();
    return callback();
  } catch (err) {
    return callback(err);
  }
};

AccountSchema.statics.subscribe = async (username, callback) => {
  try {
    await AccountModel.findOneAndUpdate({ username }, { isPro: true }).exec();
    return callback();
  } catch (err) {
    return callback(err);
  }
};

AccountSchema.statics.unsubscribe = async (username, callback) => {
  try {
    await AccountModel.findOneAndUpdate({ username }, { isPro: false }).exec();
    return callback();
  } catch (err) {
    return callback(err);
  }
};

AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel;

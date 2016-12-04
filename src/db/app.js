'use strict';

const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  publisher: { type: String, required: true },
  store_url: { type: String, required: true }
});

const model = mongoose.model('App', appSchema);
module.exports = model;

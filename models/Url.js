//has been created to make schema which in our case would be just 1 url

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
urlCode: String,
longUrl: String,
shortUrl: String,
date: {type: String, default: Date.now}
});

module.exports = mongoose.model('Url',urlSchema);
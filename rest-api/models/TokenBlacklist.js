const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String } = Schema.Types;

const tokenBlacklistSchema = new Schema({
    token: String
});

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema, 'black-list');

module.exports = TokenBlacklist;
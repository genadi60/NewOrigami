const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId } = Schema.Types;

const origamiSchema = new Schema({

    description: { type: String, required: true },

    author: { type: ObjectId, ref: "User" }

});

const Origami = mongoose.model('Origami', origamiSchema, 'origami');

module.exports = Origami;
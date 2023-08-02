const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);

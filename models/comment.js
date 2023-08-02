const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: String,
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CommentTest', CommentSchema);

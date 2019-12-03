const mongoose = require('mongoose');

const SuggestionStatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permission: {
        type: String
    }
});

mongoose.model('SuggestionStatus', SuggestionStatusSchema);
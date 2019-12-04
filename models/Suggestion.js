const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    /*
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SuggestionStatus',
        required: true
    },
    -- temporarily simplified --
    */
    status: {
        type: String,
        required: true
    },
    highPriority: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

mongoose.model('Suggestion', SuggestionSchema);
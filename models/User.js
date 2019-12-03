const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true
    }
});

mongoose.model('User', UserRoleSchema);
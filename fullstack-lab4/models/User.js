const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [4, 'Username must be at least 4 characters long'],
        maxlength: [100, 'Username cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        match: [/^[a-zA-Z\s]*$/, 'City must contain only alphabets and space']
    },
    website: {
        type: String,
        required: [true, 'Website is required'],
        match: [/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please enter a valid URL with http or https']
    },
    zipCode: {
        type: String,
        required: [true, 'Zip Code is required'],
        match: [/^\d{5}-\d{4}$/, 'Zip code must be in the format 12345-1234']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^\d{1}-\d{3}-\d{3}-\d{4}$/, 'Phone must be in the format 1-123-123-1234']
    }
});

module.exports = mongoose.model('User', UserSchema);

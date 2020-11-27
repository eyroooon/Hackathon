const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    contact: {
        type: [String],
        unique: true,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    location: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]
});

storeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Store', storeSchema);
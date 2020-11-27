const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  foodType: {
    type: [String],
    unique: true,
    required: true,
    minlength: 3,
  },
  description : {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    },
details: [{
        size: {
            type: String,
            default: "default"
        },
        price: {
            type: String,
            required: true
        }
    }],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  }]
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Store', storeSchema);
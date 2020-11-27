const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  firstName:  {
    type: String,
    required: true,
  },
  lastName:  {
    type: String,
    required: true,
  },
  contact: [String] ,
  passwordHash: {
    type: String,
    required: true,
  },

});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);

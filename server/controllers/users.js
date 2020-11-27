const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/users');
const Store = require('../models/store');

 


userRouter.post('/', async (req, res) => {
  const body = req.body;

  if (body.passwordHash.length < 3) {
    return res
      .status(400)
      .json({ error: 'Minimum of 3 characters in password' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds);

  const user = new User({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    contact: body.contact,
    email: body.email,
    passwordHash,
  });

  const saveUser = await user.save();
  res.json(saveUser);
}); 



userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate({path:"stores", model:Store})
  response.json(users)
})

module.exports = userRouter;

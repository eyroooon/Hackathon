const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/users');

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
    name: body.name,
    passwordHash,
  });

  const saveUser = await user.save();
  res.json(saveUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter;

  
const storeRouter = require('express').Router();
const Store = require('../models/store');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

storeRouter.get('/', async (request, response) => {
  const store = await Store.find({}).populate('user', { username: 1, firstName: 1 });
  response.json(store);
});

storeRouter.get('/:id', async (request, response) => {
  const store = await Store.findById(request.params.id).populate('products',[{name: 1}]);
  response.json(store);
});


storeRouter.post('/', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (body.name === undefined || body.contact === undefined|| body.location === undefined || body.desciption === undefined) {
    return response.status(400).json({ error: 'something is missing' });
  }

  const newStore = new Store({
    name: body.name,
    description: body.desciption,
    contact: body.contact,
    location: body.location,
    user: user._id,
  });
  const savedStore = await newStore.save();
  user.stores = user.stores.concat(savedStore.id);
  await user.save();
  response.json(savedStore);
});

storeRouter.delete('/:id', async (request, response) => {
  const store = await Store.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (store.user.toString() === user._id.toString()) {
    const deletedStore = await Store.findByIdAndRemove(store._id);
    user.stores = user.stores.filter((s) => s.toString() !== store._id.toString());
    await user.save();
    response.json(deletedStore);
  } else {
    return response.status(400).json({ error: 'bad request' });
  }
});

storeRouter.put('/:id', async (request, response) => {
 const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (body.name === undefined || body.contact === undefined|| body.location === undefined || body.desciption === undefined) {
    return response.status(400).json({ error: 'something is missing' });
  }

  const newStore ={
    name: body.name,
    description: body.desciption,
    contact: body.url,
    location: body.location,
    user: user._id,
  };



  const update = await Store.findByIdAndUpdate(request.params.id, newStore);

  response.json(update);
});

module.exports = storeRouter;
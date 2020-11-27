  const productRouter = require('express').Router();
  const Product = require('../models/products');
  const Store = require('../models/store');

  productRouter.get('/', async(request, response) => {
      const products = await Product.find({});
      response.json(products);
  });

  productRouter.get('/:productID', async(request, response) => {
      const product = await Product.find({});
      response.json(product);
  });

  productRouter.get('/:storeId', async(request, response) => {
      const product = await Product.findById(request.params.storeId);
      response.json(product);
  });

  productRouter.post('/:storeId', async(request, response) => {
      const body = request.body;

      if (body.name === undefined || body.foodType === undefined || body.description === undefined || body.details === undefined) {
          return response.status(400).json({ error: 'something is missing' });
      }

      const store = await Store.findById(request.params.storeId)

      if (!store) {
          return response.status(404).json({ error: 'store id not found!!' });
      }

      const newProduct = new Product({
          name: body.name,
          description: body.description,
          foodType: body.foodType,
          details: body.details,
          store: store._id,
      });
      const savedProducts = await newProduct.save();
      store.products = store.products.concat(savedProducts.id);
      await store.save();
      response.json(savedProducts);
  });

  productRouter.delete('/:id', async(request, response) => {
      const product = await Product.findById(request.params.id);


      const store = await Store.findById(product.store)

      if (store) {
          return response.status(404).json({ error: 'store not found!!' });
      }


      if (product.store.toString() === store._id.toString()) {
          const deletedProduct = await Product.findByIdAndRemove(product._id);
          store.products = store.products.filter((p) => p.toString() !== product._id.toString());
          await store.save();
          response.json(deletedProduct);
      } else {
          return response.status(400).json({ error: product.store.toString() === store._id.toString() });
      }
  });


  module.exports = productRouter;
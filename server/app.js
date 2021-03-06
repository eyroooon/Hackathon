const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const storeRouter = require('./controllers/store')
const productRouter = require('./controllers/products')
const app = express();

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

logger.info('connecting to', config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message);
    });
console.log(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/stores', storeRouter);
app.use('/api/products', productRouter);




app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
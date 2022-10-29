'use strict';
const express = require('express');
const dotenv = require('dotenv');

const { initDb } = require('./models');

const users = require('./routes/users');
const products = require('./routes/products');

dotenv.config();

initDb(); 

const app = express();

app.use(express.json());

app.use('/api/users', users); 
app.use('/api/products', products); 
 

app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000')
});
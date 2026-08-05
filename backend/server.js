import express from 'express';
import dotenv from 'dotenv';

import products from './data/products.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send('ByteBay API is running');
});

app.get('/api/health', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'ByteBay API is running',
    environment: process.env.NODE_ENV,
  });
});

app.get('/api/products', (request, response) => {
  response.status(200).json(products);
});

app.get('/api/products/:id', (request, response) => {
  const productId = Number(request.params.id);

  const product = products.find(
    (product) => product.id === productId
  );

  if (!product) {
    return response.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return response.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(
    `ByteBay server is running on port ${PORT}`
  );
});
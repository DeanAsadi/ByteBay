import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js';

dotenv.config();

await connectDB();

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

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `ByteBay server is running on port ${PORT}`
  );
});
import express from 'express';
import dotenv from 'dotenv';

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

app.listen(PORT, () => {
  console.log(
    `ByteBay server is running on port ${PORT}`
  );
});
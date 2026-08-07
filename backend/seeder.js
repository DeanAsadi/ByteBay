import dotenv from 'dotenv';

import connectDB from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('Data imported successfully');

    process.exit(0);
  } catch (error) {
    console.error(
      `Import error: ${error.message}`
    );

    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data destroyed successfully');

    process.exit(0);
  } catch (error) {
    console.error(
      `Destroy error: ${error.message}`
    );

    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
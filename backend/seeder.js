import dotenv from 'dotenv';

import connectDB from './config/db.js';

import Product from './models/productModel.js';
import User from './models/userModel.js';

import products from './data/products.js';
import users from './data/users.js';

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    for (const user of users) {
      await User.create(user);
    }

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
    await User.deleteMany();
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
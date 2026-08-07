import Product from '../models/productModel.js';

const getProducts = async (request, response, next) => {
  try {
    const products = await Product.find({});

    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (
  request,
  response,
  next
) => {
  try {
    const product = await Product.findById(
      request.params.id
    );

    if (!product) {
      response.status(404);

      throw new Error('Product not found');
    }

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductById,
};
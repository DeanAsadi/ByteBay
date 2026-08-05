import products from '../data/products.js';

const getProducts = (request, response) => {
  response.status(200).json(products);
};

const getProductById = (request, response) => {
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
};

export {
  getProducts,
  getProductById,
};
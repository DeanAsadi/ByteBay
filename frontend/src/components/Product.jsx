import { Button, Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <small className="text-muted">
          {product.category}
        </small>

        <Card.Title
          as="h3"
          className="product-title"
        >
          <Link
            to={`/product/${product._id}`}
            className="text-decoration-none"
          >
            {product.name}
          </Link>
        </Card.Title>

        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />

        <Card.Text
          as="div"
          className="product-price mt-2"
        >
          ${product.price.toFixed(2)}
        </Card.Text>

        <Button className="mt-auto">
          <FaShoppingCart className="me-2" />
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
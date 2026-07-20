import { Button, Card } from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="product-card h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <Card.Body className="d-flex flex-column">
        <small className="text-muted">{product.category}</small>

        <Card.Title as="h3" className="product-title">
          {product.name}
        </Card.Title>

        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />

        <Card.Text as="div" className="product-price mt-2">
          ${product.price.toFixed(2)}
        </Card.Text>

        <Button className="mt-auto">
          <FaShoppingCart className="me-2" />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
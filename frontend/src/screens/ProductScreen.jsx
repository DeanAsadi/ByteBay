import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Alert,
  Form,
} from 'react-bootstrap';

import products from '../data/products';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <Alert variant="warning" className="text-center mt-5">
        <h4>Product Not Found</h4>
        <p>Please check the URL or return to the homepage.</p>
      </Alert>
    );
  }

  const addToCartHandler = () => {
    const cartItem = {
      ...product,
      qty,
    };

    dispatch(addToCart(cartItem));

    navigate('/cart');
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>

                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    {product.countInStock > 0
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>

                    <Col>
                      <Form.Select
                        value={qty}
                        onChange={(event) =>
                          setQty(Number(event.target.value))
                        }
                      >
                        {Array.from(
                          { length: product.countInStock },
                          (_, index) => index + 1
                        ).map((number) => (
                          <option key={number} value={number}>
                            {number}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="w-100"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
import {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `/api/products/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              'Product not found.'
            );
          }

          throw new Error(
            'Failed to load the product.'
          );
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    const cartItem = {
      ...product,
      qty,
    };

    dispatch(addToCart(cartItem));

    navigate('/cart');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error}
      </Message>
    );
  }

  if (!product) {
    return (
      <Message variant="warning">
        Product not found.
      </Message>
    );
  }

  return (
    <>
      <Link
        className="btn btn-light my-3"
        to="/"
      >
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
                    <strong>
                      ${product.price}
                    </strong>
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
                          setQty(
                            Number(
                              event.target.value
                            )
                          )
                        }
                      >
                        {Array.from(
                          {
                            length:
                              product.countInStock,
                          },
                          (_, index) => index + 1
                        ).map((quantity) => (
                          <option
                            key={quantity}
                            value={quantity}
                          >
                            {quantity}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={
                    product.countInStock === 0
                  }
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
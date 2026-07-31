import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  Button,
  Form,
} from 'react-bootstrap';
import {
  FaTrash,
  FaTrashAlt,
} from 'react-icons/fa';

import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../slices/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const subtotalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const subtotalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  const updateQuantityHandler = (
    item,
    newQuantity
  ) => {
    const updatedItem = {
      ...item,
      qty: newQuantity,
    };

    dispatch(addToCart(updatedItem));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearCartHandler = () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to remove all items from your cart?'
    );

    if (userConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0">
            Shopping Cart
          </h1>
        </Col>

        {cartItems.length > 0 && (
          <Col xs="auto">
            <Button
              type="button"
              variant="outline-danger"
              onClick={clearCartHandler}
            >
              <FaTrashAlt className="me-2" />
              Clear Cart
            </Button>
          </Col>
        )}
      </Row>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="info">
              Your cart is empty.
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>

                    <Col md={3}>
                      {item.name}
                    </Col>

                    <Col md={2}>
                      ${item.price}
                    </Col>

                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        aria-label={`Quantity for ${item.name}`}
                        onChange={(event) =>
                          updateQuantityHandler(
                            item,
                            Number(
                              event.target.value
                            )
                          )
                        }
                      >
                        {Array.from(
                          {
                            length:
                              item.countInStock,
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

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() =>
                          removeFromCartHandler(
                            item.id
                          )
                        }
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Subtotal ({subtotalItems}{' '}
                  {subtotalItems === 1
                    ? 'item'
                    : 'items'}
                  )
                </h4>

                <strong>
                  ${subtotalPrice.toFixed(2)}
                </strong>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
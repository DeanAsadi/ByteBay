import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from 'react-bootstrap';

const CartScreen = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const subtotalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      <h1>Shopping Cart</h1>

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

                    <Col md={4}>
                      {item.name}
                    </Col>

                    <Col md={2}>
                      ${item.price}
                    </Col>

                    <Col md={2}>
                      Qty: {item.qty}
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
                  Subtotal ({subtotalItems} items)
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
import { useParams, useSearchParams } from 'react-router-dom';
import products from '../data/products';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const qty = Number(searchParams.get('qty')) || 1;
  const product = products.find(
  (product) => product.id === Number(id)
);

if (!product) {
  return <h2>Product Not Found</h2>;
}
    
  return (
  <>
    <h1>Shopping Cart</h1>

    <Row>

      <Col md={8}>

        <ListGroup variant="flush">

          <ListGroup.Item>

            <Row>

              <Col md={2}>

                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  rounded
                />

              </Col>

              <Col md={4}>

                {product.name}

              </Col>

              <Col md={2}>

                ${product.price}

              </Col>

              <Col md={2}>

                Qty: {qty}

              </Col>

            </Row>

          </ListGroup.Item>

        </ListGroup>

      </Col>

      <Col md={4}>

        <Card>

          <ListGroup variant="flush">

            <ListGroup.Item>

              <h4>

                Subtotal

              </h4>

              ${product.price * qty}

            </ListGroup.Item>

          </ListGroup>

        </Card>

      </Col>

    </Row>

  </>
);
};

export default CartScreen; 
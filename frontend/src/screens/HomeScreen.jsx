import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import products from '../data/products';

const HomeScreen = () => {
  return (
    <>
      <h1 className="mb-4">Latest Products</h1>

      <Row>
        {products.map((product) => (
          <Col
            key={product.id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="mb-4"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
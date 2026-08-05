import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(
            'Failed to load products.'
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="mb-4">
        Latest Products
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error}
        </Message>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
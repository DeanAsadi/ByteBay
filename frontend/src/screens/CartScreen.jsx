import { useParams, useSearchParams } from 'react-router-dom';

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const qty = Number(searchParams.get('qty')) || 1;

  return (
    <>
      <h1>Shopping Cart</h1>

      <p>Product ID: {id}</p>

      <p>Quantity: {qty}</p>
    </>
  );
};

export default CartScreen; 
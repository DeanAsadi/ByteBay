import { useSelector } from 'react-redux';
import {
  Navbar,
  Nav,
  Container,
  Badge,
} from 'react-bootstrap';
import {
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            ByteBay
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar"
          />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart className="me-1" />
                Cart

                {cartItemsCount > 0 && (
                  <Badge
                    pill
                    bg="primary"
                    className="ms-2"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Nav.Link>

              <Nav.Link as={Link} to="/login">
                <FaUser className="me-1" />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
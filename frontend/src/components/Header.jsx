import {
  Navbar,
  Nav,
  Container
} from 'react-bootstrap';

import {
  FaShoppingCart,
  FaUser
} from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>

          <Navbar.Brand>
            ByteBay
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="ms-auto">

              <Nav.Link>

                <FaShoppingCart /> Cart

              </Nav.Link>

              <Nav.Link>

                <FaUser /> Sign In

              </Nav.Link>

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
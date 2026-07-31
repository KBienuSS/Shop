import { Navbar, Nav } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import './MainMenu.scss';
import Cart from '../../pages/Cart/Cart';

const MainMenu = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <Navbar expand="md" className="main-navbar animated fadeIn d-flex justify-content-between w-100">
      <Nav className="main-nav-left">
        <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
      </Nav>

      <Nav className="main-nav-right align-items-center position-relative">
        <button
          className="btn cart-toggle-btn"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingCart />
        </button>

        {showCart && (
          <Cart/>
        )}
      </Nav>
    </Navbar>
  );
};

export default MainMenu;
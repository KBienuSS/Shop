import './Cart.scss';
import { getOrder, changeQuantity, deleteProduct, changeComment } from '../../../redux/orderRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const order = useSelector(getOrder);
  const isEmpty = !order.products || order.products.length === 0;

  const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = order.products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(changeQuantity(productId, newQuantity));
  };

  const handleRemove = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleCommentChange = (productId, newComment) => {
    dispatch(changeComment(productId, newComment));
  };

  const handleGoToSummary = () => {
    navigate('/order-summary');
    onClose();
  };

  return (
    <div className="cart-dropdown">
      <p className="cart-dropdown__header">Twój koszyk</p>

      {isEmpty ? (
        <p className="cart-dropdown__empty">Koszyk jest pusty</p>
      ) : (
        <>
          <div className="cart-dropdown__list">
            {order.products.map((p) => (
              <div className="cart-item" key={p.id}>
                <div className="cart-item__thumb">{p.name.charAt(0)}</div>

                <div className="cart-item__content">
                  <div className="cart-item__row">
                    <p className="cart-item__name">{p.name}</p>
                    <button
                      type="button"
                      className="cart-item__remove"
                      aria-label="Usuń produkt"
                      onClick={() => handleRemove(p.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="cart-item__row cart-item__row--controls">
                    <div className="cart-item__stepper">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(p.id, p.quantity - 1)}
                        disabled={p.quantity <= 1}
                        aria-label="Zmniejsz ilość"
                      >
                        −
                      </button>
                      <span>{p.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(p.id, p.quantity + 1)}
                        aria-label="Zwiększ ilość"
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item__price">
                      {(p.quantity * p.price).toLocaleString('pl-PL')} zł
                    </p>
                  </div>

                  <textarea
                    className="cart-item__comment"
                    placeholder="Dodaj opis"
                    defaultValue={p.comment}
                    onChange={(e) => handleCommentChange(p.id, e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="cart-dropdown__summary">
            <span>Liczba sztuk: {totalItems}</span>
            <span className="cart-dropdown__total">
              {totalPrice.toLocaleString('pl-PL')} zł
            </span>
          </div>

          <button
            type="button"
            className="cart-dropdown__checkout"
            onClick={handleGoToSummary}
          >
            Przejdź do podsumowania zamówienia
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
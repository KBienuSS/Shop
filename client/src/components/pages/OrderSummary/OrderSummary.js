import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getOrder,
  getOrderSendingStatus,
  getOrderSendingError,
  sendOrder,
} from '../../../redux/orderRedux';
import './OrderSummary.scss';

const OrderSummary = () => {
  const order = useSelector(getOrder);
  const sending = useSelector(getOrderSendingStatus);
  const sendingError = useSelector(getOrderSendingError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = order.products.reduce(
    (sum, p) => sum + p.quantity * p.price,
    0
  );

  const handleFieldChange = (field) => (e) => {
    setContactData({ ...contactData, [field]: e.target.value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d+\s-]{9,}$/;

    if (!contactData.firstName.trim()) newErrors.firstName = 'Podaj imię';
    if (!contactData.lastName.trim()) newErrors.lastName = 'Podaj nazwisko';
    if (!contactData.email.trim()) {
      newErrors.email = 'Podaj adres e-mail';
    } else if (!emailRegex.test(contactData.email)) {
      newErrors.email = 'Nieprawidłowy adres e-mail';
    }
    if (!contactData.phone.trim()) {
      newErrors.phone = 'Podaj numer telefonu';
    } else if (!phoneRegex.test(contactData.phone)) {
      newErrors.phone = 'Nieprawidłowy numer telefonu';
    }
    if (!contactData.address.trim()) newErrors.address = 'Podaj adres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) {
      return;
    }

    if (order.products.length === 0) {
      return;
    }

    dispatch(sendOrder(order, contactData));
  };

  useEffect(() => {
    if (sending === 'success') {
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        navigate('/');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [sending, navigate]);

  return (
    <Container className="order-summary my-5">
      <h2 className="order-summary__title">Podsumowanie zamówienia</h2>

      <Row>
        <Col md={7}>
          <div className="order-summary__products">
            {order.products.map((p) => (
              <div className="summary-item" key={p.id}>
                <div className="summary-item__main">
                  <div>
                    <p className="summary-item__name">{p.name}</p>
                    <p className="summary-item__qty">
                      {p.quantity} × {p.price.toLocaleString('pl-PL')} zł
                    </p>
                  </div>
                  <p className="summary-item__subtotal">
                    {(p.quantity * p.price).toLocaleString('pl-PL')} zł
                  </p>
                </div>

                {p.comment && (
                  <p className="summary-item__comment">„{p.comment}”</p>
                )}
              </div>
            ))}
          </div>

          <div className="order-summary__total">
            <span>Liczba sztuk: {totalItems}</span>
            <span className="order-summary__total-price">
              {totalPrice.toLocaleString('pl-PL')} zł
            </span>
          </div>
        </Col>

        <Col md={5}>
          <div className="order-summary__form">
            <h3 className="order-summary__form-title">Dane kontaktowe</h3>

              {sending === 'error' && (
                <Alert variant="danger" className="py-2">
                  {sendingError || 'Coś poszło nie tak. Spróbuj ponownie.'}
                </Alert>
              )}

              {showSuccessMessage && (
                <Alert variant="success" className="py-2">
                  Zamówienie zostało pomyślnie złożone! Za chwilę wrócisz do strony głównej.
                </Alert>
              )}

              {order.products.length === 0 && !showSuccessMessage &&(
                <Alert variant="warning" className="py-2">
                  Twój koszyk jest pusty.
                </Alert>
              )}

            <Form>
              <Row className="g-2">
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                      type="text"
                      value={contactData.firstName}
                      onChange={handleFieldChange('firstName')}
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                      type="text"
                      value={contactData.lastName}
                      onChange={handleFieldChange('lastName')}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Adres e-mail</Form.Label>
                <Form.Control
                  type="email"
                  value={contactData.email}
                  onChange={handleFieldChange('email')}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numer telefonu</Form.Label>
                <Form.Control
                  type="tel"
                  value={contactData.phone}
                  onChange={handleFieldChange('phone')}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Adres</Form.Label>
                <Form.Control
                  type="text"
                  value={contactData.address}
                  onChange={handleFieldChange('address')}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Uwagi do zamówienia</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={contactData.notes}
                  onChange={handleFieldChange('notes')}
                />
              </Form.Group>

              <Button
                variant="primary"
                className="order-summary__submit"
                onClick={handleOrder}
                disabled={sending === 'pending'}
              >
                {sending === 'pending' ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Wysyłanie...
                  </>
                ) : (
                  'Order'
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSummary;
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux'
import { useParams } from 'react-router-dom';

const Product = () => {

  const { id } = useParams();
  const product = useSelector(getProductById(id));

  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    //logika dodawania do koszyka
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
          />
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted fs-4">od {product.minPrice} zł</p>

          <p>
            {product.description}
          </p>

          <div className="d-flex align-items-center gap-3 mt-4">
            <Form.Group style={{ width: '100px' }}>
              <Form.Control
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddToCart}>
              Dodaj do koszyka
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Dodatkowe zdjęcia</h4>
          <Row className="g-3">
            {product.additionalImages.map(image => 
            <Col xs={4}>
              <img
                src={image}
                alt={image}
                className="img-fluid rounded"
              />
            </Col>)}
            
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
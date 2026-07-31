import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>

        <Card.Text className="text-muted mt-auto mb-3">
          od <strong>{product.minPrice} zł</strong>
        </Card.Text>

        <Button
          as={Link}
          to={`/product/${product.id}`}
          variant="primary"
          className="mt-auto"
        >
          Zobacz szczegóły
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard'
import { getProducts, getProductsLoadingStatus, getProductsError } from '../../../redux/productsRedux'
import './Main.scss';

const Main = () => {

  const products = useSelector(getProducts);
  const loading = useSelector(getProductsLoadingStatus);
  const error = useSelector(getProductsError);

  if (loading === 'pending') return <p>Ładowanie produktów...</p>;
  if (loading === 'error') return <p>Błąd: {error}</p>;

  return(
  <div>
    <h1 className="title">All products</h1>
    <Container>
      <Row className="g-4 mb-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  </div>
  );
};

export default Main;
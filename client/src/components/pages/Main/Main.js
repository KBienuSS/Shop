import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard'
import {getProducts} from '../../../redux/productsRedux'
import './Main.scss';

const Main = () => {

  const products = useSelector(getProducts);

  return(
  <div>
    <h1 className="title">All products</h1>
    <Container>
      <Row className="g-4">
          {products.map(product => (
          <Col key={product.id} xs={4}>
              <ProductCard product={product} />
          </Col>
          ))}
      </Row>
    </Container>
  </div>
  );
};

export default Main;
import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListProducts from '../Components/ListProducts';

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoaded: false
    };
  }

  async componentDidMount() {
    await this.fetchALlProducts();
  }

  async fetchALlProducts() {
    const respone = await fetch('http://localhost:5000/api/products');
    const data = await respone.json();
    this.setState({
      products: data.products,
      isLoaded: true
    });
  }

  render() {
    return (
      <Container className='product-section pt-3'>
        <Row className='control'>
          <Col>
            <Button variant='success' size='lg'>
              Add
              <FontAwesomeIcon icon={faPlus} className='ml-2' />
            </Button>
          </Col>
        </Row>
        <Row className='product-list mt-4'>
          <Col>
            {!this.state.isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              <ListProducts products={this.state.products} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

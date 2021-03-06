import React, { Component } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  Breadcrumb,
  Dropdown
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListProducts from '../components/ListProducts';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoaded: false
    };
    this.removeProduct = this.removeProduct.bind(this);
  }

  async componentDidMount() {
    await this.fetchALlProducts();
  }

  async fetchALlProducts() {
    const respone = await fetch(`${process.env.REACT_APP_API}/products`);
    const { data } = await respone.json();
    this.setState({
      products: data.products,
      isLoaded: true
    });
  }

  removeProduct(product) {
    this.setState({
      products: [...this.state.products].filter(
        item => item._id !== product._id
      )
    });
  }

  render() {
    return (
      <Container className='product-section pt-3'>
        {this.props.admin && (
          <Row className='control'>
            <Col>
              <Button variant='success' size='lg'>
                Add
                <FontAwesomeIcon icon={faPlus} className='ml-2' />
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item className='d-flex align-items-center'>
                Products
              </Breadcrumb.Item>
              <Dropdown className='ml-auto'>
                <Dropdown.Toggle className='px-3'>Sort</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>By Name</Dropdown.Item>
                  <Dropdown.Item>By Price</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className='product-list mt-4'>
          <Col>
            {!this.state.isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              <ListProducts
                products={this.state.products}
                remove={this.removeProduct}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

Product.defaultProps = {
  admin: false
};

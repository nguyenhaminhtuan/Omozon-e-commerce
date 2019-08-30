import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListProducts from '../components/ListProducts';

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      isLoaded: false
    };

    this.getProductFromCategory = this.getProductFromCategory.bind(this);
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.getProductFromCategory(params.categoryId).then(response => {
      if (response.status === 200) {
        const { products } = response.data.category;
        this.setState({
          products,
          isLoaded: true
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const curCategoryId = this.props.match.params.categoryId;
    const prevCategoryId = prevProps.match.params.categoryId;

    if (prevCategoryId !== curCategoryId) {
      this.getProductFromCategory(curCategoryId).then(response => {
        if (response.status === 200) {
          const { products } = response.data.category;
          this.setState({
            products,
            isLoaded: true
          });
        }
      });
    }
  }

  async getProductFromCategory(categoryId) {
    const response = await fetch(
      `${process.env.REACT_APP_API}/categories/${categoryId}`
    );
    const body = await response.json();

    return { status: response.status, data: body.data };
  }

  render() {
    const { products, isLoaded } = this.state;
    return (
      <Container className='pt-5'>
        {isLoaded ? (
          !products[0] ? (
            <h1>Category has no products</h1>
          ) : (
            <Row>
              <Col>
                <ListProducts products={this.state.products}></ListProducts>
              </Col>
            </Row>
          )
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
    );
  }
}

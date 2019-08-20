import React from 'react';
import ProductItem from './ProductItem';
import { Row, Col } from 'react-bootstrap';

export default function ListProducts(props) {
  return (
    <Row>
      {props.products.map(product => (
        <Col md='3' className='mb-4'>
          <ProductItem
            key={product.id}
            image={product.img}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        </Col>
      ))}
    </Row>
  );
}

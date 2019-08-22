import React from 'react';
import ProductItem from './ProductItem';
import { Row, Col } from 'react-bootstrap';

export default function ListProducts(props) {
  return (
    <Row>
      {props.products.map((product, index) => (
        <Col key={index} md='3' className='mb-4'>
          <ProductItem
            key={product._id}
            product={product}
            remove={props.remove}
          />
        </Col>
      ))}
    </Row>
  );
}

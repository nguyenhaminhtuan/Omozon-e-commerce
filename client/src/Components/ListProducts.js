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
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        </Col>
      ))}
    </Row>
  );
}

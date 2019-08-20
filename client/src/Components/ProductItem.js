import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ProductItem(props) {
  async function getProduct() {
    const respone = await fetch(
      `http://localhost:5000/api/products/${props.id}`
    );
    const data = await respone.json();
    console.log(data);
  }

  return (
    <Card className='product-item'>
      <Card.Img
        variant='top'
        src={`http://localhost:5000/static/img/products/${props.image}`}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle style={{ color: '#00D233' }}>
          {`${props.price} vnd`}
        </Card.Subtitle>
        <Card.Text className='text-secondary'>
          {props.description.slice(0, 150)}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center'>
        <Button
          id='product-details'
          variant='primary'
          size='sm'
          onClick={getProduct}>
          Details
        </Button>
        <Button
          id='product-update'
          variant='warning'
          size='sm'
          className='ml-2 mr-2'>
          Update
        </Button>
        <Button id='product-delete' variant='danger' size='sm'>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

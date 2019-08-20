import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ProductItem(props) {
  return (
    <Card className={props.className}>
      <Card.Img variant='top' src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle style={{ color: '#00D233' }}>
          {`${props.price} vnd`}
        </Card.Subtitle>
        <Card.Text>{props.description.slice(0, 150)}</Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center'>
        <Button variant='primary' size='sm'>
          Details
        </Button>
        <Button variant='warning' size='sm' className='ml-2 mr-2'>
          Update
        </Button>
        <Button variant='danger' size='sm'>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

import React from 'react';
import { Container } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container className='mt-5 p-5'>
      <h1 className='display-1 text-center mt-5'>404</h1>
      <h2 className='display-2 text-center'>NOT FOUND!</h2>
    </Container>
  );
}

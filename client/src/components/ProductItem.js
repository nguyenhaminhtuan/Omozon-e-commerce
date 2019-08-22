import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CenterModal from './CenterModal';
import styled from 'styled-components';

export default function ProductItem(props) {
  const [button, setButton] = useState('');

  const productImg = `${process.env.REACT_APP_IMG}/products/${
    props.product.image
  }`;

  const ProductWrapper = styled.div`
    max-width: 100%;
    cursor: pointer;
    text-align: center;

    &:hover {
      transform: scale(1.01);
      transition: ease 0.2s;
      box-shadow: 0px 0px 10px 10px rgb(0, 0, 0, 0.1);
    }
  `;

  function handleOpenModal(buttonValue) {
    if (button === buttonValue) return true;
    return false;
  }

  function handleCloseModal() {
    setButton('');
  }

  async function removeProduct() {
    await fetch(`${process.env.REACT_APP_API}/products/${props.product._id}`, {
      method: 'DELETE'
    });
    props.remove(props.product);
  }

  return (
    <div className='product-item'>
      <Card className='product-card-info'>
        <ProductWrapper onClick={() => setButton('details')}>
          <Card.Img variant='top' src={productImg} alt={props.product.name} />
          <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Subtitle style={{ color: '#00D233' }}>
              {`${props.product.price} vnd`}
            </Card.Subtitle>
            <Card.Text className='text-secondary'>
              {props.product.description.slice(0, 150)}
            </Card.Text>
          </Card.Body>
        </ProductWrapper>
        <Card.Footer className='d-flex justify-content-center'>
          <Button id='product-update' variant='warning' className='mr-2'>
            Update
          </Button>
          <Button
            id='product-delete'
            variant='danger'
            onClick={() => setButton('delete')}>
            Delete
          </Button>
        </Card.Footer>
      </Card>

      <CenterModal
        size='lg'
        show={handleOpenModal('details')}
        onHide={handleCloseModal}
        header={`${props.product.brand} ${props.product.name}`.toUpperCase()}
        image={productImg}
        title={props.product.name}
        subtitle={props.product.price}
        body={props.product.description}
      />
      <CenterModal
        size='lg'
        show={handleOpenModal('delete')}
        onHide={handleCloseModal}
        header={`${props.product.brand} ${props.product.name}`.toUpperCase()}
        title='Are you sure to remove this product'
        button={{
          confirm: (
            <Button
              variant='danger'
              size='lg'
              onClick={async () => removeProduct()}>
              Yes
            </Button>
          ),
          cancel: (
            <Button variant='secondary' size='lg' onClick={handleCloseModal}>
              No
            </Button>
          )
        }}
      />
    </div>
  );
}

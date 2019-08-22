import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export default function CenterModal(props) {
  const Image = styled.img`
    display: block;
    margin: auto;
    max-width: 100%;
    height: auto;
  `;
  const LinkToImage = styled.a`
    cursor: pointer;
  `;

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.image && (
          <LinkToImage href={props.image} target='_blank'>
            <Image src={props.image} alt={props.title} />
          </LinkToImage>
        )}
        <h4>{props.title}</h4>
        {props.subtitle && <h5>{props.subtitle}</h5>}
        <p>{props.body}</p>
      </Modal.Body>
      {props.button && (
        <Modal.Footer>
          {props.button.confirm}
          {props.button.cancel}
        </Modal.Footer>
      )}
    </Modal>
  );
}

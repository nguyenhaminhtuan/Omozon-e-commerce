import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  FormControl,
  Container,
  FormGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap';

export default class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isAuthenticated: false,
      token: null
    };
  }

  render() {
    const FormWrapper = styled.div`
      @media (min-width: 768px) {
        display: block;
        margin: auto;
        max-width: 75%;
      }

      @media (min-width: 996px) {
        display: block;
        margin: auto;
        max-width: 50%;
      }
    `;
    return (
      <Container className='sign-in mt-5'>
        <FormWrapper>
          <Form id='sign-in-form' className='bg-white rounded shadow px-5 py-4'>
            <h1 className='text-center text-primary mb-4 mt-3'>Sign In</h1>
            <FormGroup as={Row} className='mb-4'>
              <Col
                sm='1'
                className='d-flex align-items-center justify-content-end'>
                <FontAwesomeIcon
                  icon={faAt}
                  style={{ fontSize: '25px' }}
                  className='d-none d-sm-block'
                />
              </Col>
              <Col sm='11'>
                <FormControl
                  id='email'
                  className=''
                  type='email'
                  placeholder='Enter your email'
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup as={Row} className='mb-4'>
              <Col
                sm='1'
                className='d-flex align-items-center justify-content-end'>
                <FontAwesomeIcon
                  icon={faLock}
                  style={{ fontSize: '25px' }}
                  className='d-none d-sm-block'
                />
              </Col>
              <Col sm='11'>
                <FormControl
                  id='password'
                  className=''
                  type='password'
                  placeholder='Enter your password'
                  required
                />
              </Col>
            </FormGroup>
            <Button
              type='submit'
              variant='success'
              className='d-block mx-auto mt-4 mb-2 px-4 py-2'>
              Sign in
            </Button>
          </Form>
        </FormWrapper>
      </Container>
    );
  }
}

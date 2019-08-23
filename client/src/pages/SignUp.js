import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  FormControl,
  Container,
  FormGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnchange() {}

  handleSubmit() {}

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
            <h1 className='text-center text-primary mb-4 mt-3'>Sign Up</h1>
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
                  icon={faUser}
                  style={{ fontSize: '25px' }}
                  className='d-none d-sm-block'
                />
              </Col>
              <Col sm='11'>
                <FormControl
                  id='name'
                  className=''
                  type='text'
                  placeholder='Enter your name'
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
            <FormGroup className='text-center mt-4'>
              <Button
                type='submit'
                variant='primary'
                className='d-block w-50 mx-auto mb-3'>
                Sign up
              </Button>
              <Link to='/signin' style={{ textDecoration: 'underline' }}>
                Sign in
              </Link>
            </FormGroup>
          </Form>
        </FormWrapper>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  FormControl,
  FormGroup,
  Row,
  Col,
  Button,
  Alert
} from 'react-bootstrap';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      message: this.props.message
    };

    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleOnchange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFocus() {
    setTimeout(
      () =>
        this.setState({
          message: ''
        }),
      1000
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    const { email, name, password } = this.state;
    this.props.submit({ email, name, password });
  }

  render() {
    return (
      <Form
        id='sign-in-form'
        className='bg-white rounded shadow px-5 py-4'
        onSubmit={this.handleSubmit}>
        <h1 className='text-center text-primary mb-4 mt-3'>Sign Up</h1>
        {this.state.message && (
          <Alert
            className='p-1 text-center'
            variant={!this.props.success ? 'danger' : 'success'}
            style={{ marginTop: '-10px' }}>
            {this.state.message}
          </Alert>
        )}
        <FormGroup as={Row} className='mb-4'>
          <Col sm='1' className='d-flex align-items-center justify-content-end'>
            <FontAwesomeIcon
              icon={faAt}
              style={{ fontSize: '25px' }}
              className='d-none d-sm-block'
            />
          </Col>
          <Col sm='11'>
            <FormControl
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              onChange={this.handleOnchange}
              onFocus={this.handleFocus}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className='mb-4'>
          <Col sm='1' className='d-flex align-items-center justify-content-end'>
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: '25px' }}
              className='d-none d-sm-block'
            />
          </Col>
          <Col sm='11'>
            <FormControl
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              onChange={this.handleOnchange}
              onFocus={this.handleFocus}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className='mb-4'>
          <Col sm='1' className='d-flex align-items-center justify-content-end'>
            <FontAwesomeIcon
              icon={faLock}
              style={{ fontSize: '25px' }}
              className='d-none d-sm-block'
            />
          </Col>
          <Col sm='11'>
            <FormControl
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              onChange={this.handleOnchange}
              onFocus={this.handleFocus}
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
    );
  }
}

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  FormControl,
  FormGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signin({ email, password });
  }

  render() {
    return (
      <Form
        id='sign-in-form'
        className='bg-white rounded shadow px-5 py-4'
        onSubmit={this.handleSubmit}>
        <h1 className='text-center text-primary mb-4 mt-3'>Sign In</h1>
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
              onChange={this.handleChange}
              placeholder='Enter your email'
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
              onChange={this.handleChange}
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
    );
  }
}

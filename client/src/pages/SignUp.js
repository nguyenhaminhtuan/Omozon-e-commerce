import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import SignUpForm from '../components/SignUpForm';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isSubmit: false,
      message: '',
      success: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidUpdate() {
    const { isSubmit, success } = this.state;

    if (isSubmit && !success) await this.signUp();
  }

  onSubmit(user) {
    this.setState({ user, isSubmit: true });
  }

  async signUp() {
    const respone = await fetch(`${process.env.REACT_APP_API}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    });
    const { message } = await respone.json();

    if (respone.status === 400) {
      this.setState({
        isSubmit: false,
        message: message.split('"').join(''),
        success: false
      });
    } else if (respone.status === 201) {
      this.setState({
        isSubmit: false,
        message: message.split('"').join(''),
        success: true
      });
    }
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
    const { success, message } = this.state;

    return (
      <Container className='sign-in mt-5'>
        <FormWrapper>
          <SignUpForm
            submit={this.onSubmit}
            success={success}
            message={message}
          />
        </FormWrapper>
      </Container>
    );
  }
}

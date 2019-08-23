import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import SignInForm from '../components/SignInForm';

export default class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  signIn(user) {
    console.log(user);
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
          <SignInForm signin={this.signIn} />
        </FormWrapper>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import SignInForm from '../components/SignInForm';
import storage from '../utils/storage';

export default class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isSubmit: false,
      message: ''
    };

    this.signIn = this.signIn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.isSubmit) {
      this.signIn().then(response => {
        const { data, status } = response;
        if (status === 400) {
          this.setState({
            message: data.message.split('"').join(''),
            isSubmit: false
          });
        } else if (status === 200) {
          storage.setToken(data.token);
          this.props.checkAuth({ isAuth: true });
          this.props.history.push('/');
        }
      });
    }
  }

  onSubmit(user) {
    this.setState({
      user,
      isSubmit: true
    });
  }

  async signIn() {
    const { user } = this.state;

    const response = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    });
    const data = await response.json();

    return { status: response.status, data };
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
          <SignInForm submit={this.onSubmit} message={this.state.message} />
        </FormWrapper>
      </Container>
    );
  }
}

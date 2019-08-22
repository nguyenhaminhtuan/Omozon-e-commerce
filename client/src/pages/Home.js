import React, { Component } from 'react';
import backgroundImage from '../assets/image/background-landing.jpg';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    const IntroSection = styled.section`
      background-image: linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)),
        url(${backgroundImage});
      height: 80vh;
      color: #fff;
      background-size: cover;
      background-position: center;
    `;
    const Forward = styled.div`
      position: absolute;
      top: 45%;
      left: 20%;
    `;
    return (
      <div className='Home'>
        <IntroSection className='intro-section'>
          <Forward className='forward'>
            <h1 className='display-4 mb-4'>Everything you need...</h1>
            <Button variant='primary' className='w-25 mr-3'>
              Let's go >>
            </Button>
            <Button variant='outline-success' className='text-white w-25'>
              Sign in
            </Button>
          </Forward>
        </IntroSection>
        <Container>Home</Container>
      </div>
    );
  }
}

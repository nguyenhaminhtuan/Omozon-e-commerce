import React, { Component } from 'react';
import backgroundImage from '../assets/image/background-landing.jpg';
import styled from 'styled-components';
import FutureSection from '../components/FutureSection';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faUserCircle,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

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
            <NavLink to='/product' className='btn btn-primary w-25 mr-3'>
              Let's go >>
            </NavLink>
            <NavLink
              to='/signin'
              className='btn btn-outline-success text-white w-25'>
              Sign in
            </NavLink>
          </Forward>
        </IntroSection>
        <Container className='future-section mt-5 mb-5 d-flex flex-column flex-md-row justify-content-evenly'>
          <FutureSection
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          />
          <FutureSection
            icon={<FontAwesomeIcon icon={faUserCircle} />}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          />
          <FutureSection
            icon={<FontAwesomeIcon icon={faAward} />}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          />
        </Container>
      </div>
    );
  }
}

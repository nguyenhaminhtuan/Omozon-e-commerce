import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/image/logo.png';
import { NavLink } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

export default function MainNavbar(props) {
  const ListItem = styled.ul`
    margin: 0;
    padding: 0;
  `;
  const linkStyle = {
    display: 'block',
    margin: '0 auto',
    padding: '10px 1.8rem',
    width: '150px',
    borderRadius: '4px'
  };

  return (
    <Navbar
      expand='lg'
      sticky='top'
      className='main-nav-bar shadow'
      style={{
        backgroundColor: 'rgb(255, 255, 255, 0.4)'
      }}>
      <Container>
        <NavLink to='/' className='navbar-brand'>
          <img
            src={logo}
            alt='logo'
            style={{ width: '75px', height: 'auto' }}
          />
        </NavLink>
        <Navbar.Toggle aria-controls='navbar-collapse' />
        <Navbar.Collapse id='navbar-collapse'>
          <ListItem
            className='navbar-nav ml-auto'
            style={{ fontSize: '20px', fontWeight: '400' }}>
            {props.navs.map((nav, index) => (
              <NavLink
                key={index}
                to={nav === 'HOME' ? '/' : `${nav.toLowerCase()}`}
                className='nav nav-link text-primary custom-link text-center'
                style={linkStyle}>
                {nav}
              </NavLink>
            ))}
          </ListItem>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

MainNavbar.defaultProps = {
  navs: ['HOME', 'PRODUCT', 'CATEGORY', 'SIGN IN']
};

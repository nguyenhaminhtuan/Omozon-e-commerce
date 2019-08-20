import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSearch,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';

export default function AdminNavbar(props) {
  const [curPage, setCurPage] = useState('Dashboard');

  const SideBarStyle = {
    height: '100vh',
    backgroundColor: '#282C34',
    color: '#fff'
  };
  const SignOutButton = styled.div`
    color: rgb(255, 0, 0);
    &:hover {
      color: #fff;
      cursor: pointer;
    }
  `;

  function upperFirst(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  }

  return (
    <Navbar bg='dark' expand='lg' className='admin-navbar'>
      <Navbar.Toggle aria-controls='navbar-collapse' />
      <Navbar.Collapse id='navbar-collapse'>
        <Container fluid>
          <Row>
            <Col lg='2' className='sidebar fixed-top' style={SideBarStyle}>
              <h2 className='Logo text-center border-bottom p-3'>Omozon</h2>
              <div
                className='user-info text-center border-bottom p-3'
                style={{ fontSize: '18px' }}>
                <FontAwesomeIcon
                  icon={faUser}
                  className='mr-3'
                  style={{ fontSize: '22px' }}
                />
                {props.username}
              </div>
              {props.nav.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item}`}
                  className='nav nav-link text-center p-3 mt-2'
                  activeClassName='bg-secondary'
                  onClick={() => setCurPage(item)}>
                  {upperFirst(item)}
                </NavLink>
              ))}
            </Col>
            <Col lg='10' className='topbar ml-auto'>
              <Container fluid>
                <Row>
                  <Col lg='3' className='current-page'>
                    <h3 className='text-white'>{upperFirst(curPage)}</h3>
                  </Col>
                  <Col lg='4' className='navbar-search'>
                    <Form className='form-search'>
                      <InputGroup>
                        <FormControl
                          className='border-0'
                          placeholder='Search...'
                        />
                        <Button variant='secondary'>
                          <FontAwesomeIcon icon={faSearch} />
                        </Button>
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col className='navbar-util d-flex align-items-center'>
                    <SignOutButton className='signout ml-auto'>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        style={{
                          fontSize: '22px'
                        }}
                      />
                      Sign out
                    </SignOutButton>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}

AdminNavbar.defaultProps = {
  username: 'Admin',
  nav: ['dashboard', 'user', 'product', 'category', 'order']
};

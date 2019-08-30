import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/image/logo.png';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Dropdown } from 'react-bootstrap';

export default function MainNavbar(props) {
  const [categories, setCategories] = useState(null);

  useState(() => {
    getAllCategories().then(response => {
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    });
  });

  async function getAllCategories() {
    const response = await fetch(`${process.env.REACT_APP_API}/categories`);
    const body = await response.json();

    return { status: response.status, data: body.data };
  }

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
        backgroundColor: 'rgb(255, 255, 255, 0.9)'
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
            {props.navs.map((nav, index) =>
              nav === 'categories' ? (
                <Dropdown key={index}>
                  <Dropdown.Toggle
                    as='a'
                    id='cateogries-dropdown'
                    className="nav nav-link text-primary custom-link text-center'"
                    style={linkStyle}>
                    {nav.toUpperCase()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='text-center'>
                    {categories
                      ? categories.map((category, index) => (
                          <Dropdown.Item key={index}>
                            <NavLink
                              key={category._id}
                              to={`/categories/${category._id}`}>
                              {category.name.toUpperCase()}
                            </NavLink>
                          </Dropdown.Item>
                        ))
                      : 'Loading'}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <NavLink
                  key={index}
                  to={nav === 'home' ? '/' : `/${nav.split(' ').join('')}`}
                  className='nav nav-link text-primary custom-link text-center'
                  style={linkStyle}>
                  {nav.toUpperCase()}
                </NavLink>
              )
            )}
          </ListItem>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

MainNavbar.defaultProps = {
  navs: ['home', 'products', 'categories', 'sign up']
};

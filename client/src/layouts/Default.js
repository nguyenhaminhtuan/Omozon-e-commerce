import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import storage from '../utils/storage';
import MainNavbar from '../components/layouts/MainNavbar';
import SingIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Categories from '../pages/Categories';

export default function Default(props) {
  function Logout() {
    storage.removeToken();
    props.logout(false);

    return <Redirect to='/' />;
  }

  return (
    <Router>
      {props.authenticated ? (
        <React.Fragment>
          <MainNavbar navs={['home', 'profile', 'cart', 'log out']} />
          <Switch>
            <Route exact path='/' component={Products} />
            <Route path='/profile' component={Profile} />
            <Route path='/logout' component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MainNavbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path='/signin'
              render={rest => <SingIn {...rest} checkAuth={props.checkAuth} />}
            />
            <Route path='/products' component={Products} />
            <Route path='/signup' component={SignUp} />
            <Route
              exact
              path='/categories/:categoryId'
              component={Categories}
            />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      )}
    </Router>
  );
}

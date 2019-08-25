import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
}

PrivateRoute.defaultProps = {
  authenticated: false
};

export default PrivateRoute;

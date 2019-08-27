import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      // Rest props e.g: exact, path,...
      {...rest}
      // Props from route e.g: match,...
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

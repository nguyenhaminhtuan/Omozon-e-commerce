import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminNavbar from './components/layouts/AdminNavbar';
import Products from './pages/Products';
import MainNavbar from './components/layouts/MainNavbar';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <React.Fragment>
          <MainNavbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/products' component={Products} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;

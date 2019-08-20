import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminNavbar from './Components/Layouts/AdminNavbar';
import Product from './Pages/Product';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <React.Fragment>
          <AdminNavbar />
          <Switch>
            <Route path='/product' component={Product} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;

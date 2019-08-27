import React, { Component } from 'react';
import customFetch from './utils/fetch';
import storage from './utils/storage';
import Default from './layouts/Default';
import Admin from './layouts/Admin';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isAuth: false,
      isAdmin: false,
      login: false,
      logged: false
    };

    this.getUser = this.getUser.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    if (storage.getToken()) {
      this.getUser().then(response => {
        if (response.status === 'success') {
          const user = response.data.profile;

          if (user.isAdmin) this.setState({ isAdmin: true });

          this.setState({
            user,
            isAuth: true,
            logged: true
          });
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.state.login) {
      this.getUser().then(response => {
        if (response.status === 'success') {
          const user = response.data.profile;

          if (user.isAdmin) this.setState({ isAdmin: true });

          this.setState({
            user,
            isAuth: true,
            login: false,
            logged: true
          });
        }
      });
    }
  }

  async getUser() {
    const response = await customFetch(
      `${process.env.REACT_APP_API}/users/profile`,
      'GET'
    );

    return response;
  }

  onLogin(check) {
    this.setState({
      login: check.isAuth
    });
  }

  onLogout(logged) {
    this.setState({
      logged,
      isAuth: false
    });
  }

  render() {
    const { isAdmin, isAuth } = this.state;
    return (
      <div className='App'>
        {isAdmin ? (
          <Admin />
        ) : (
          <Default
            authenticated={isAuth}
            checkAuth={this.onLogin}
            logout={this.onLogout}
          />
        )}
      </div>
    );
  }
}

export default App;

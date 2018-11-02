import React, { Component } from 'react';
import { connect } from 'react-redux';

import actionCreators from '../actions/';
// helper
// import { loadSession } from '../helpers';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validation: '',
    };
    this.submiting = true;
  }

  renderValidation(type, textFailed) {
		const { username, password, validation } = this.state;

		const emailValid = type === 'username' && username.length > 0;
		const pwdValid = type === 'password' && password.length > 0;
		const result = emailValid || pwdValid;
		return (
			validation && !result && <small style={{ textAlign: 'center', marginLeft: '2.5em', color: '#ee5342' }}>{ textFailed }</small>
		);
	}

  handleLogin() {
		const { username, password } = this.state;
		const usernameValid = username.length > 0;
		const pwdValid = password.length > 0;
		const isAllValid = usernameValid && pwdValid;

		if (isAllValid) {
      this.submiting = true;
      const data = new FormData();
      data.append('username', username);
      data.append('password', password);
      this.props.signin(data);
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;
    const { isFetching, isFound, isError } = auth;

    if (!isFetching && this.submiting) {
      this.submiting = false
      if (isFound) {
        this.props.history.push('/');
      }
      if (isError) {
        alert(auth.message)
      }
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={e => this.setState({ username: e.target.value })}
          autoComplete="off" />  
          { this.renderValidation('username', 'Mohon isi username Anda') }
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          autoComplete="off"
        /> 
        { this.renderValidation('password', 'Mohon isi password Anda') }
        <input type="submit" value="Sign In" onClick={() => this.handleLogin()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	signin: params => dispatch(actionCreators.signin(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

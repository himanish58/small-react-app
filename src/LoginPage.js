import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			password: '',
			loginFailed: this.props.loginFailed
		};

		this.styles = {
			textField: {
				width: '100%',
				margin: '1rem'
			},
			button: {
				margin: '1rem'
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.loginFailed !== this.state.loginFailed) {
			this.setState({loginFailed: nextProps.loginFailed});
		}
	}

	userNameChangeHandler = (e) => {
		this.setState({userName: e.target.value, loginFailed: false});
	}

	passwordChangeHandler = (e) => {
		this.setState({password: e.target.value, loginFailed: false});
	}

	render() {
		let {userName, password, loginFailed} = this.state;
		let disableLogin = !(userName.length && password.length);

		return (
			<div className="login-container">
				<div className="login-header">Login</div>
				<div className="login-body">
					<TextField ref="userName" onChange={this.userNameChangeHandler} style={this.styles.textField} label="User Name" error={loginFailed} required />
					<TextField ref="password" onChange={this.passwordChangeHandler} style={this.styles.textField} label="Password" type="password" error={loginFailed} required />
					<Button style={this.styles.button} variant="contained" color="primary" onClick={this.props.loginClickHandler.bind(this, userName, password)} disabled={disableLogin}>Login</Button>
					{this.state.loginFailed && <p>Username/Password is not correct</p>}
				</div>
			</div>
		)
	}
}

LoginPage.propTypes = {
	loginClickHandler: PropTypes.func
}

export default  LoginPage;

import React, { Component } from 'react';
import './App.scss';

import LoginPage from './LoginPage';
import Homepage from './Homepage';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedin: false,
			loginFailed: false
		}
	}

	loginClickHandler = (userName, password) => {
	let isLoggedin = (userName === 'shaadi' && password === '123');
	this.setState({isLoggedin, loginFailed: !isLoggedin});
	}

	render() {
		return (
			<div className="app">
				{
					this.state.isLoggedin? (
						<Homepage />
					): (
						<LoginPage loginClickHandler={this.loginClickHandler} loginFailed={this.state.loginFailed} />
					)
				}
			</div>
		)
	}
}

export default App;

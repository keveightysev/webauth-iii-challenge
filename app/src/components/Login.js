import React from 'react';
import axios from 'axios';

class Login extends React.Component {
	state = {
		username: '',
		password: '',
	};

	handleChanges = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(
				'http://localhost:4319/api/auth/login/',
				this.state,
			);
			await localStorage.setItem('token', res.data.token);
			await this.setState({
				username: '',
				password: '',
			});
			this.props.history.push('/users');
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Please Log In</h2>
				<div>
					<label htmlFor='username'>Enter a username</label>
					<input
						type='text'
						id='username'
						value={this.state.username}
						onChange={this.handleChanges}
					/>
				</div>
				<div>
					<label htmlFor='password'>Enter a password</label>
					<input
						type='password'
						id='password'
						value={this.state.password}
						onChange={this.handleChanges}
					/>
				</div>
				<button>Submit</button>
			</form>
		);
	}
}

export default Login;

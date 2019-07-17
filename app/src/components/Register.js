import React from 'react';
import axios from 'axios';

class Register extends React.Component {
	state = {
		username: '',
		password: '',
		role: '',
	};

	handleChanges = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		try {
			const user = await axios.post(
				'http://localhost:4319/api/auth/register',
				this.state,
			);
			const res = await axios.post('http://localhost:4319/api/auth/login/', {
				username: user.data.username,
				password: this.state.password,
			});
			await this.setState({
				username: '',
				password: '',
				role: '',
			});
			await localStorage.setItem('token', res.data.token);
			this.props.history.push('/users');
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
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
				<div>
					<label htmlFor='role'>What is your role?</label>
					<input
						type='text'
						id='role'
						value={this.state.role}
						onChange={this.handleChanges}
					/>
				</div>
				<button>Submit</button>
			</form>
		);
	}
}

export default Register;

import React from 'react';

import requiresAuth from '../auth/requiresAuth';
import axios from 'axios';

class Users extends React.Component {
	state = {
		users: [],
	};

	async componentDidMount() {
		try {
			const res = await axios.get('/users');
			this.setState({ users: res.data });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<section>
				<h2>Users Page</h2>
				<ul>
					{this.state.users.map(user => (
						<li key={user.id}>{user.username}</li>
					))}
				</ul>
			</section>
		);
	}
}

export default requiresAuth(Users);

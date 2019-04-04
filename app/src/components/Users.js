import React from 'react';

import requiresAuth from '../auth/requiresAuth';

class Users extends React.Component {
	render() {
		return <h2>Users Page</h2>;
	}
}

export default requiresAuth(Users);

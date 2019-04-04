import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4319/api';

axios.interceptors.request.use(config => {
	config.headers.authorization = localStorage.getItem('token');
	return config;
});

export default function(Component) {
	return function Authenticated(props) {
		const notLoggedIn = <h2>Please log in to view the users</h2>;
		return localStorage.getItem('token') ? (
			<Component {...props} />
		) : (
			notLoggedIn
		);
	};
}

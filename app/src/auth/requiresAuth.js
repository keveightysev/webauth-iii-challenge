import React from 'react';
import axios from 'axios';

import Login from '../components/Login';

axios.defaults.baseURL = 'http://localhost:4319/api';

axios.interceptors.request.use(config => {
	config.headers.authorization = localStorage.getItem('token');
	return config;
});

export default function(Component) {
	return function Authenticated(props) {
		return localStorage.getItem('token') ? (
			<Component {...props} />
		) : (
			<Login {...props} />
		);
	};
}

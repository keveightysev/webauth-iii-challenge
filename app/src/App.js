import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

class App extends React.Component {
	render() {
		return (
			<>
				<header>
					<NavLink to='/'>Home</NavLink>
					&nbsp; | &nbsp;
					<NavLink to='/register'>Register</NavLink>
					&nbsp; | &nbsp;
					<NavLink to='/login'>Log In</NavLink>
					&nbsp; | &nbsp;
					<NavLink to='/users'>Users</NavLink>
				</header>
				<main>
					<Route path='/' exact component={Home} />
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Route path='/users' component={Users} />
				</main>
			</>
		);
	}
}

export default App;

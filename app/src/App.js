import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';

class App extends React.Component {
	render() {
		return (
			<>
				<header>
					<NavLink to='/'>Home</NavLink>
				</header>
				<main>
					<Route path='/' exact component={Home} />
				</main>
			</>
		);
	}
}

export default App;

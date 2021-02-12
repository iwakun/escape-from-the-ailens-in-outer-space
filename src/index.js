import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Home, Room } from "./pages";

import './styles.scss';

const App = () => {
	const history = useHistory();

	return (
		<Switch>
			<Route exact path="/">
				<Home history={history} />
			</Route>
			<Route exact path="/rooms/:id">
				<Room history={history} />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'draft-js-image-plugin/lib/plugin.css';
import '../imports/ui/stylesheets/preloader-beer.css';
import '../imports/ui/stylesheets/sweetalert2.min.css';
import '../imports/ui/stylesheets/react-datepicker.css';
import '../imports/ui/stylesheets/style.css';

// Layouts
import FrontLayout from '../imports/ui/FrontLayout';
import AdminLayout from '../imports/ui/AdminLayout';
import LoginLayout from '../imports/ui/LoginLayout';

// User login flow
import Login from '../imports/ui/users/Login';
import Forgot from '../imports/ui/users/Forgot';
import InviteSignup from '../imports/ui/users/InviteSignup';

// Pages
import Home from '../imports/ui/pages/Home';
import PagesWrapper from '../imports/ui/pages/PagesWrapper';
import PageSingle from '../imports/ui/pages/PageSingle';
import EditPage from '../imports/ui/pages/EditPage';
import AdminDashboard from '../imports/ui/pages/AdminDashboard';
import Calendar from '../imports/ui/events/Calendar';
import ReservationForm from '../imports/ui/reservations/ReservationForm';

// Users
import UserWrapper from '../imports/ui/users/UserWrapper';

// Events
import AdminEvents from '../imports/ui/events/AdminEvents';

// Menus
import AdminMenus from '../imports/ui/menus/AdminMenus';
import MenuWrapper from '../imports/ui/menus/MenuWrapper';

// Cards
import CardsWrapper from '../imports/ui/cards/CardsWrapper';
import EditCard from '../imports/ui/cards/EditCard';
import RegisterCard from '../imports/ui/cards/RegisterCard';


// Redirect to '/' on logout, uses gwendall:accounts-helpers
Accounts.onLogout(function() {
	browserHistory.push('/login');
});

// AUTH LOGIC
const authenticate = (nextState, replace, callback) => {

	// If no user, send to login
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
	}
	callback();
	
};

const checkIfLoggedIn = (nextState, replace, callback) => {

	// If no user, send to login
	if (Meteor.userId()) {
		replace({
			pathname: '/admin',
			state: { nextPathname: nextState.location.pathname },
		});
	}
	callback();
	
};

// To be able to use hash links
function hashLinkScroll() {
	const { hash } = window.location;
	if (hash !== '') {
		// Push onto callback queue so it runs after the DOM is updated,
		// this is required when navigating from a different page so that
		// the element is rendered on the page before trying to getElementById.
		setTimeout(() => {
			const id = hash.replace('#', '');
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView();
			}
		}, 0);
	}
}

const routes = 
	<Router history={browserHistory} onUpdate={hashLinkScroll}>

		<Route path="/" component={FrontLayout}>
			<IndexRoute name="HOME" component={Home} />	
			<Route name="PAGE" path="pages/:urlFriendlyName" component={PageSingle} />
			<Route name="CALENDAR" path="calendar" component={Calendar} />
			<Route name="MENU" path="menu" component={MenuWrapper} />
			<Route name="RESERVATIONS" path="reservations" component={ReservationForm} />
		</Route>

		<Route path="/admin" component={AdminLayout} onEnter={authenticate}>
			<IndexRoute name="ADMIN" component={AdminDashboard} />
			<Route name="USERS" path="users" component={UserWrapper} />
			<Route name="PAGES" path="pages" component={PagesWrapper} />
			<Route name="EDIT PAGE" path="pages/edit/:urlFriendlyName" component={EditPage} />
			<Route name="EVENTS" path="events" component={AdminEvents} />
			<Route name="MENUS" path="menus" component={AdminMenus} />
			<Route name="CARDS" path="cards" component={CardsWrapper} />
			<Route name="EDIT CARD" path="cards/edit/:cardId" component={EditCard} />
		</Route>

		<Route path="/login" component={LoginLayout} onEnter={checkIfLoggedIn}>
			<IndexRoute name="LOGIN" component={Login} />
			<Route name="FORGOT" path="forgot" component={Forgot}/>
			<Route name="ADMIN SIGNUP" path="invite/:token" component={InviteSignup} />
		</Route>

		<Route path="/card" component={LoginLayout}>
			<Route name="REGISTER CARD" path="register/:token" component={RegisterCard} />
		</Route>

	</Router>
	

Meteor.startup( () => {
	render(routes, document.getElementById('render-target'));
});
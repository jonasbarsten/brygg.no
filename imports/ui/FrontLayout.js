import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

import FrontNav from './navigation/FrontNav';
import FrontFooter from './navigation/FrontFooter';

class FrontLayout extends Component {
	
	render() {

		const routeName = Meteor.settings.public.siteTitle + ' || ' + this.props.routes[this.props.routes.length - 1].name;

		return (
			<div>
				<Helmet>
					<title>{routeName}</title>
				</Helmet>
				<FrontNav />
				<div id="front-content" className="container">
					{this.props.children}
				</div>
				<FrontFooter />
			</div>
		);
	}
}

export default FrontLayout;
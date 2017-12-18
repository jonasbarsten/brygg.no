import React, {Component} from 'react';

class LoginLayout extends Component {
	
	render() {
		return (
			<div id="login-layout" className="container">
				{this.props.children}
			</div>
		);
	}
}

export default LoginLayout;
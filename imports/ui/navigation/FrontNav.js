import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminNav extends Component {

	componentDidMount() {

		// Close menu when clicking links
		$(document).on('click','.navbar-collapse.in',function(e) {
		    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
		        $(this).collapse('hide');
		    }
		});
	}

	render () {

		const pathName = this.props.pathName;

		const omActiveClass = (pathName == '/pages/about') ? 'active' : '';
		const kalenderActiveClass = (pathName == '/calendar') ? 'active' : '';
		const menyActiveClass = (pathName == '/menu') ? 'active' : '';
		const reservasjonActiveClass = (pathName == '/pages/reservation') ? 'active' : '';
		// const brygglabActiveClass = (pathName == '/pages/brygglab') ? 'active' : '';
		// const julebordActiveClass = (pathName == '/pages/julebord') ? 'active' : '';

		return (
			<nav id="front-navbar" className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<button id="front-navbar-toggle" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/"><img src="/images/logo.png"/></Link>
					</div>

					<div className="collapse navbar-collapse no-transition" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li className={omActiveClass}><Link to="/pages/om-brygg">OM BRYGG</Link></li>
							{
								// <li className={julebordActiveClass}><Link to="/pages/julebord">JULEBORD</Link></li>
							}
							<li className={kalenderActiveClass}><Link to="/calendar">KALENDER</Link></li>
							<li className={menyActiveClass}><Link to="/menu">MENY</Link></li>
							<li className={reservasjonActiveClass}><Link to="/reservations">RESERVASJON</Link></li>
							{ 
								// <li className={brygglabActiveClass}><a href="http://brygglab.no" target="self">BRYGGLAB</a></li>
							}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default AdminNav;
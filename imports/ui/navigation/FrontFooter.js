import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class FrontFooter extends Component {
	render () {

		const pagesInFooter = (this.props.pagesInFooter) ? this.props.pagesInFooter : [];

		return (
			<div id="front-footer" className="container">
				<div className="row">
					<div className="col-xs-6 col-sm-4" style={{color: 'rgb(255,213,118)', marginBottom: '50px', fontFamily: 'Plaak6Ney-56-Heavy', fontSize: '12px'}}>
						<span>BRYGG OSLO:</span>
						<div style={{fontFamily: 'Plaak4Terme-34-RegularA'}}>
							<span>Storgata 5 - 7, Oslo, Norway</span>
							<br />
							<span>post@brygg.no</span>
							<br />
						</div>
						<div style={{marginTop: '20px'}}>
							<a href="https://www.instagram.com/bryggoslo/" target="blank">
								<img src="/images/icons/instagram.png" />
							</a>
							<a href="https://www.facebook.com/bryggoslo/" target="blank">
								<img src="/images/icons/facebook.png" style={{marginLeft: '15px'}} />
							</a>
						</div>
					</div>
					<div className="col-xs-6 col-sm-4" style={{color: 'rgb(254,242,156)', fontFamily: 'Plaak6Ney-56-Heavy', fontSize: '12px'}}>
						

						{pagesInFooter.map((page) => {
							const url = '/pages/' + page.urlFriendlyName;

							return (
								<Link to={url} key={page._id}>
									<div>{page.name}</div>
								</Link>
							);
						})}

						<Link to='/reservations'>
							<div>Reservasjon</div>
						</Link>
						<Link to='/menu'>
							<div>Meny</div>
						</Link>
						<Link to='/calendar'>
							<div>Kalender</div>
						</Link>
						<a href='http://brygglab.no' target='blank'>
							<div>Brygglab</div>
						</a>

					</div>
					<div className="mobile-clearfix"></div>
					<div className="col-xs-6 col-sm-4" style={{color: 'rgb(215,84,56)', fontFamily: 'Plaak6Ney-56-Heavy', fontSize: '12px'}}>
						<span>ÅPNINGSTIDER:</span>
						<br />
						<div style={{fontFamily: 'Plaak4Terme-34-RegularA'}}>
							<span>MANDAG - TIRSDAG 08:00 TIL 01:00</span>
							<br />
							<span>ONSDAG - FREDAG 08:00 TIL 03:00</span>
							<br />
							<span>LØRDAG 11:00 TIL 03:00</span>
							<br />
							<span>SØNDAG 15:00 TIL 23:00</span>
							<br />
							<br />
							<span>TAPPEBAR ÅPNER KL 14:00 på hverdager og samtidig som åpning lørdag og søndag</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('pages');

	return {
		pagesInFooter: Pages.find({isInFooter: true}).fetch()
	}

})(FrontFooter);


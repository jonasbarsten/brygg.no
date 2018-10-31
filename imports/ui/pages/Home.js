import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import EventsList from '../events/EventsList';

class Home extends Component {

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render () {

		return (
			<div>	

				<ReactCSSTransitionGroup
					transitionName='page-content'
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={1000}
					transitionAppear={true}
					transitionAppearTimeout={1000}
				>

					<div className="row">
						<Link to='/menu?type=drinks'>
							<div className="col-xs-12 col-sm-4 home-item-with-image">
								<div className="home-item-content">
									<span>DRIKKE</span>
									<img src="/images/beer.png" className="img-responsive" />
								</div>
							</div>
						</Link>
						<Link to="/pages/pingpong">
							<div className="col-xs-12 col-sm-4 home-item-text">
								<div className="home-item-content">
									<div className="table">
										<div className="table-cell">
											<span>PING PONG</span>
										</div>
									</div>
								</div>
							</div>
						</Link>
						<Link to='/menu?type=food'>
							<div className="col-xs-12 col-sm-4 home-item-with-image">
								<div className="home-item-content">
									<span>MAT</span>
									<img src="/images/food.png" className="img-responsive" />
								</div>
							</div>
						</Link>
						<Link to="/pages/olsmaking">
							<div className="col-xs-12 col-sm-4 home-item-text">
								<div className="home-item-content">
									<div className="table">
										<div className="table-cell">
											<span>ØLSMAKING</span>
										</div>
									</div>
								</div>
							</div>
						</Link>
						<Link to='/menu?type=coffee'>
							<div className="col-xs-12 col-sm-4 home-item-with-image">
								<div className="home-item-content">
									<span>KAFFE</span>
									<img src="/images/coffee.png" className="img-responsive" />
								</div>
							</div>
						</Link>
						<Link to="/reservations">
							<div className="col-xs-12 col-sm-4 home-item-text">
								<div className="home-item-content">
									<div className="table">
										<div className="table-cell">
											<span>RESERVER BORD</span>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>

					<div className="row">
						<EventsList onClick='view' range='upcoming' limit={6} />
					</div>
					<div className="row">
						<div className="col-xs-12 text-center" style={{backgroundColor: 'black'}}>
							<Link to="/calendar"><p className="underline" style={{color: 'white', marginTop: '10px', marginBottom: '10px', fontSize: '12px', fontFamily: 'Plaak6Ney-26-Light'}}>SE HELE KALENDEREN</p></Link>
						</div>
					</div>
					<div className="row">
						<img className="img-responsive" src="/images/front-pingpong.jpg" />
					</div>

				</ReactCSSTransitionGroup>
				
			</div>
		);
	}
}

export default Home;
import React, {Component} from 'react';

class Preloader extends Component {

	componentDidMount() {
		$(document).ready(function() {
		  $('.pour') //Pour Me Another Drink, Bartender!
		    .delay(300)
		    .animate({
		      height: '360px'
		      }, 500)
		    .delay(1200)
		    .slideUp(300);
		  
		  $('#liquid') // I Said Fill 'Er Up!
		    .delay(1100)
		    .animate({
		      height: '170px'
		    }, 1500);
		  
		  $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
		    .delay(1100)
		    .animate({
		      bottom: '200px'
		      }, 1500);
		  });
	}

	render () {

		// Square preloader

		return (
			<div id="preloader-beer">
				<div id="preloader-container">
				  <div className="pour"></div>
				  <div id="beaker">
				    <div className="beer-foam">
				      <div className="foam-1"></div>
				      <div className="foam-2"></div>
				      <div className="foam-3"></div>
				      <div className="foam-4"></div>
				      <div className="foam-5"></div>
				      <div className="foam-6"></div>
				      <div className="foam-7"></div>
				    </div>
				    
				    <div id="liquid">
				      
				      <div className="bubble bubble1"></div>
				      <div className="bubble bubble2"></div>
				      <div className="bubble bubble3"></div>
				      <div className="bubble bubble4"></div>
				      <div className="bubble bubble5"></div>
				    </div>
				  </div>
				</div>
			</div>
		);


		// Abstract preloader

		// return (
		// 	<div id="loader-wrapper">
		// 		<div id="loader"></div>
		// 		<div classNameName="loader-section section-left"></div>
  //           	<div classNameName="loader-section section-right"></div>
		// 	</div>
		// );
	}
}

export default Preloader;
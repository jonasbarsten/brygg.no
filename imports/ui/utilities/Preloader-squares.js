import React, {Component} from 'react';

class PreloaderSquares extends Component {

	render () {

		// Square preloader

		return (
			<div id="preloader-square">
				<div className="loader">
					<div className="square" ></div>
					<div className="square"></div>
					<div className="square last"></div>
					<div className="square clear"></div>
					<div className="square"></div>
					<div className="square last"></div>
					<div className="square clear"></div>
					<div className="square "></div>
					<div className="square last"></div>
				</div>
			</div>
		);


		// Abstract preloader

		// return (
		// 	<div id="loader-wrapper">
		// 		<div id="loader"></div>
		// 		<div className="loader-section section-left"></div>
  //           	<div className="loader-section section-right"></div>
		// 	</div>
		// );
	}
}

export default PreloaderSquares;
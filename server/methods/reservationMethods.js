Meteor.methods({
	'reservation.request': function (reservationRequest) {

		check(reservationRequest.name, String);
		check(reservationRequest.email, ValidEmail);
		check(reservationRequest.mobile, String);
		check(reservationRequest.numberOfPeople, String);
		check(reservationRequest.date, String);
		check(reservationRequest.time, String);
		check(reservationRequest.comment, String);

		SSR.compileTemplate( 'reservationRequest', Assets.getText( 'email/templates/reservationRequest.html' ) );

		Email.send({
			to: Meteor.settings.private.reservationRequestReceiver,
			from: 'Brygg WEB<no-reply@brygg.no>',
			replyTo: reservationRequest.email,
			subject: 'Brygg WEB // Reservasjonsforespørsel',
			html: SSR.render( 'reservationRequest', {
				request: reservationRequest
			})
		});

		SSR.compileTemplate( 'reservationRequestAuto', Assets.getText( 'email/templates/reservationRequestAuto.html' ) );

		Email.send({
			to: reservationRequest.email,
			from: 'Brygg WEB<no-reply@brygg.no>',
			subject: 'Brygg WEB // Reservasjonsforespørsel',
			html: SSR.render( 'reservationRequestAuto', {
				request: reservationRequest
			})
		});

		reservationRequest.createdDate = new Date();

		ReservationRequests.insert(reservationRequest);
	}
});
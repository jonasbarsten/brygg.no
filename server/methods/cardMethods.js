import uuid from 'uuid/v4';

Meteor.methods({
	'card.addSingle': function (number, description) {

		check(number, String);
		check(description, String);

		const card = {
			number: Number(number),
			description: description,
			uuid: uuid(),
			createdDate: new Date(),
			createdBy: Meteor.userId()
		}

		const cardExists = Cards.findOne({number: card.number});

		if (!cardExists) {
			if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
				Cards.insert(card);
			};
			return {err: false, message: 'Card added'};
		} else {
			return {err: true, message: `Card ${card.number} already exists`}
		}

	},
	'card.addRange': function (startNumber, endNumber, description) {
		check(startNumber, String);
		check(endNumber, String);
		check(description, String);

		let rangeIsValid = true;
		let rangeArray = [];
		let response = '';

		for (i = Number(startNumber); i <= Number(endNumber); i++) {
			
			const cardExists = Cards.findOne({number: i});
			rangeArray.push(i);

			if (cardExists) {
				rangeIsValid = false;
			}
		}

		if (!rangeIsValid) {
			console.log('One of the cards in the range already exists');
			response = {err: true, message: 'One of the cards in the range already exists'}
		}

		if (rangeIsValid) {
			rangeArray.map((cardNumber) => {

				const card = {
					number: cardNumber,
					description: description,
					uuid: uuid(),
					createdDate: new Date(),
					createdBy: Meteor.userId()
				};

				if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
					Cards.insert(card);
				};

				if (cardNumber == endNumber) {
					response = {err: false, message: 'Range added'}
				}
			});
		}

		return response;
	},
	'card.delete': function (cardId) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Cards.remove({_id: cardId});
		}
	},
	'card.inviteCardHolder': function (cardId, email) {

		let result = '';

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

    		check(email, String);

			// let emailHasCard = Cards.findOne( { inviteEmail: email } );

			// TODO:
			let token = Random.hexString( 15 );

			// if ( !emailHasCard ) {

				// Add invite to database
				Cards.update(
					{_id: cardId}, 
					{
						$set: {
							inviteEmail: email,
							inviteToken: token,
							invitedDate: new Date(),
							cardHolder: {},
							inUse: false,
							invitedBy: Meteor.userId()
						}
					}
				);
				
				// Generate HTML template for mail invite from /private/email/templates/invite.html
				SSR.compileTemplate( 'cardInviteEmail', Assets.getText( 'email/templates/cardInvite.html' ) );

				// Send invite
				Email.send({
					to: email,
					from: 'Brygg<no-reply@brygg.no>',
					subject: 'Brygg // Card invite',
					html: SSR.render( 'cardInviteEmail', {
						url: Meteor.settings.public.url + '/card/register/' + token + '?email=' + email
					})
				});

				result = {err: false, message: `${email} invited`};

			// } else {
			// 	result = {err: true, message: 'Card already in use'};
			// }
		} else {

			result = {err: true, message: 'You are not authorized to invite card holders'};
		};

		return result;
	},
	'card.registerCard': function (cardHolder) {

		const card = Cards.findOne({inviteToken: cardHolder.token, inUse: {$ne: true}});
		let result = '';

		if (card) {

			let challenge = Random.hexString( 15 );

			Cards.update(
				{_id: card._id},
				{
					$set: {
						'cardHolder.firstName': cardHolder.firstName,
						'cardHolder.lastName': cardHolder.lastName,
						'cardHolder.email': cardHolder.email,
						'cardHolder.dateRegistered': new Date(),
						'cardHolder.challenge': challenge,
						inUse: true
					}
				}
			);

			SSR.compileTemplate( 'cardConfirmationEmail', Assets.getText( 'email/templates/cardConfirmation.html' ) );

			Email.send({
				to: cardHolder.email,
				from: 'Brygg<no-reply@brygg.no>',
				subject: 'Brygg // Card registered',
				html: SSR.render( 'cardConfirmationEmail', {
					challenge: challenge
				})
			});

			result = {err: false, message: 'Card registered'};
		} else {
			result = {err: true, message: 'Card already registered or wrong token'};
		}

		return result;
	}
});
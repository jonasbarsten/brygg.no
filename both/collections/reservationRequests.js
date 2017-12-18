import SimpleSchema from 'simpl-schema';

ReservationRequests = new Mongo.Collection( 'reservationRequests' );

ReservationRequests.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

ReservationRequests.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ReservationRequestsSchema = new SimpleSchema({
	"name": {
		type: String,
		optional: true
	},
	"email": {
		type: String,
		optional: true
	},
	"mobile": {
		type: String,
		optional: true
	},
	"numberOfPeople": {
		type: String,
		optional: true
	},
	"date": {
		type: String,
		optional: true
	},
	"time": {
		type: String,
		optional: true
	},
	"comment": {
		type: String,
		optional: true
	},
	"createdDate": {
		type: Date,
		optional: true
	}
});

ReservationRequests.attachSchema( ReservationRequestsSchema );
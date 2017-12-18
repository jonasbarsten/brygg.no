import SimpleSchema from 'simpl-schema';

Cards = new Mongo.Collection( 'cards' );

Cards.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Cards.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const CardsSchema = new SimpleSchema({
	"number": {
		type: SimpleSchema.Integer,
		unique: true
	},
	"uuid": {
		type: String,
	},
	"description": {
		type: String,
		optional: true
	},
	"createdDate": {
		type: Date
	},
	"createdBy": {
		type: String
	},
	"inviteToken": {
		type: String,
		optional: true
	},
	"inviteEmail": {
		type: String,
		optional: true
	},
	"invitedDate": {
		type: String,
		optional: true
	},
	"invitedBy": {
		type: String,
		optional: true
	},
	"inUse": {
		type: Boolean,
		optional: true
	},
	"cardHolder": {
		type: Object,
		optional: true
	},
	"cardHolder.firstName": {
		type: String,
		optional: true
	},
	"cardHolder.lastName": {
		type: String,
		optional: true
	},
	"cardHolder.email": {
		type: String,
		optional: true
	},
	"cardHolder.image": {
		type: String,
		optional: true
	},
	"cardHolder.dateRegistered": {
		type: String,
		optional: true
	},
	"cardHolder.challenge": {
		type: String,
		optional: true
	}
});

Cards.attachSchema( CardsSchema );
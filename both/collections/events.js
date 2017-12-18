import SimpleSchema from 'simpl-schema';

Events = new Mongo.Collection( 'events' );

Events.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Events.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const EventsSchema = new SimpleSchema({
	"name": {
		type: String,
		optional: true
	},
	"page": {
		type: String,
		optional: true
	},
	"date": {
		type: Date,
		optional: true
	},
	"views": {
		type: Number,
		optional: true
	},
	"createdDate": {
		type: Date,
		optional: true
	},
	"createdBy": {
		type: String,
		optional: true
	}
});

Events.attachSchema( EventsSchema );
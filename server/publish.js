Meteor.publish('allUsers', function () {

	const isAdmin = Roles.userIsInRole(this.userId, ['admin', 'super-admin'], 'CMS');

	if (isAdmin) {
		return Meteor.users.find({}, {fields: {"profile": 1, "emails": 1, "createdAt": 1, "roles": 1, "status": 1}});
	} else {
		return null;
	} 
});

Meteor.publish('pages', function () {
	return Pages.find();
});

Meteor.publish('images', function () {
	return Images.find();
});

Meteor.publish('events', function () {
	return Events.find();
});

Meteor.publish('menuItems', function () {
	return MenuItems.find();
});

Meteor.publish('cards', function () {
	const isAdmin = Roles.userIsInRole(this.userId, ['admin', 'super-admin'], 'CMS');

	if (isAdmin) {
		return Cards.find();
	} else {
		return null;
	} 
});
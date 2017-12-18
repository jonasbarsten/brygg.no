import FB from 'fb';

FB.api('oauth/access_token', {
    client_id: Meteor.settings.private.facebook.appId,
    client_secret: Meteor.settings.private.facebook.appSecret,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
 
    var accessToken = res.access_token;
    FB.setAccessToken(accessToken);
});



Meteor.methods({
	'event.add': function (name, date, page) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			const event = {
				name: name,
				date: date,
				page: page,
				createdDate: new Date,
				createdBy: Meteor.userId()
			};

			Events.insert(event);
		}
	},
	'event.delete': function (id) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Events.remove({_id: id});
		}
	},
	'event.getFacebookEvents': function () {

		const url = `/${Meteor.settings.private.facebook.pageId}/events`;

		const response = FB.api(url);

		return response;
	}
});
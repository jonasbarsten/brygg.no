// import util from 'util';

const auth = Meteor.settings.private.untappd.email + ':' + Meteor.settings.private.untappd.readOnly;
const options = {
	auth: auth
};

Meteor.methods({
	'menu.fetchMenus': function () {

		this.unblock();

		const menusUrl = 'https://business.untappd.com/api/v1/locations/' + Meteor.settings.private.untappd.locationId + '/menus';
		const menusRaw = HTTP.get(menusUrl, options);

		const customMenusUrl = 'https://business.untappd.com/api/v1/locations/' + Meteor.settings.private.untappd.locationId + '/custom_menus';
		const customMenusRaw = HTTP.get(customMenusUrl, options);

		let menusCombined = [];

		menusRaw.data.menus.map((menu) => {
			menusCombined.push(menu);
		});

		// customMenusRaw.data.custom_menus.map((menu) => {
		// 	menusCombined.push(menu);
		// });

		return menusCombined;

	},
	'menu.fetchSections': function (menuId) {

		this.unblock();

		const sectionsUrl = 'https://business.untappd.com/api/v1/menus/' + menuId + '/sections';
		const sectionsRaw = HTTP.get(sectionsUrl, options);

		return sectionsRaw.data.sections;
	},
	'menu.fetchItems': function (sectionId) {

		this.unblock();

		const itemsUrl = 'https://business.untappd.com/api/v1/sections/' + sectionId + '/items';
		const itemsRaw = HTTP.get(itemsUrl, options);

		return itemsRaw.data.items;
	},
	'menu.fetchContainers': function (itemId) {

		this.unblock();

		const containersUrl = 'https://business.untappd.com/api/v1/items/' + itemId + '/containers';
		const containersRaw = HTTP.get(containersUrl, options);


		return containersRaw.data.containers;
	},
	'menu.track': function () {

		this.unblock();
		
		const trackUrl = 'https://business.untappd.com/api/v1/locations/' + Meteor.settings.private.untappd.locationId + '/analytics?source_name=brygg.no'
		HTTP.get(trackUrl, options);
	}
});
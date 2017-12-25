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

			menu.type = 'beer';

			menusCombined.push(menu);
		});

		customMenusRaw.data.custom_menus.map((menu) => {

			menu.type = 'custom';

			menusCombined.push(menu);
		});

		return menusCombined;

	},
	'menu.fetchSections': function (menu) {

		this.unblock();

		let sectionsRaw = {};

		if (menu.type == 'beer') {
			const sectionsUrl = 'https://business.untappd.com/api/v1/menus/' + menu.id + '/sections';
			sectionsRaw = HTTP.get(sectionsUrl, options);
			sectionsRaw = sectionsRaw.data.sections;
		}

		if (menu.type == 'custom') {
			const sectionsUrl = 'https://business.untappd.com/api/v1/custom_menus/' + menu.id + '/custom_sections';
			sectionsRaw = HTTP.get(sectionsUrl, options);
			sectionsRaw = sectionsRaw.data.custom_sections;
		}

		return sectionsRaw;
	},
	'menu.fetchItems': function (section) {

		this.unblock();

		let itemsRaw = {};

		if (section.type == 'beer') {
			const itemsUrl = 'https://business.untappd.com/api/v1/sections/' + section.id + '/items';
			itemsRaw = HTTP.get(itemsUrl, options);
			itemsRaw = itemsRaw.data.items;
		}

		if (section.type == 'custom') {
			const itemsUrl = 'https://business.untappd.com/api/v1/custom_sections/' + section.id + '/custom_items';
			itemsRaw = HTTP.get(itemsUrl, options);
			itemsRaw = itemsRaw.data.custom_items;
		}

		return itemsRaw;
	},
	'menu.fetchContainers': function (item) {

		this.unblock();

		let containersRaw = {};

		if (item.type == 'beer') {
			const containersUrl = 'https://business.untappd.com/api/v1/items/' + item.id + '/containers';
			containersRaw = HTTP.get(containersUrl, options);
			containersRaw = containersRaw.data.containers;
		}

		if (item.type == 'custom') {
			const containersUrl = 'https://business.untappd.com/api/v1/custom_items/' + item.id + '/custom_containers';
			containersRaw = HTTP.get(containersUrl, options);
			containersRaw = containersRaw.data.custom_containers;
		}

		return containersRaw;
	},
	'menu.track': function () {

		this.unblock();
		
		const trackUrl = 'https://business.untappd.com/api/v1/locations/' + Meteor.settings.private.untappd.locationId + '/analytics?source_name=brygg.no'
		HTTP.get(trackUrl, options);
	}
});
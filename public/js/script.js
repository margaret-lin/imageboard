import { AlexaForBusiness } from 'aws-sdk';

/* eslint-disable indent */
new Vue({
	el: '#main',
	data: {
		name: 'Habanero',
		seen: true,
		animals: []
	},
	methods: {
		myFunction: function() {
			console.log('myFunction is running');
		}
	},
	mounted: () => {
		console.log('my vue component has mounted');
		console.log('this is my animals data', this.animals);
		var me = this;
		axios.get('animals').then(res => {
			console.log('response from animals', res);
			console.log(me.animals);
			me.animals = res.data;
		});
	}
});

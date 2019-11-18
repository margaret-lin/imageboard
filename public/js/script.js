/* eslint-disable indent */
new Vue({
	el: '#main',
	data: {
		images: []
	},
	mounted: function() {
		var me = this;
		axios.get('/image').then(response => {
			me.images = response.data;
		});
	}
});

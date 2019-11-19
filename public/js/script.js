new Vue({
    el: '#main',
    data: {
        images: []
        // title: '',
        // description: '',
        // username: '',
        // file: null
    },
    mounted: function() {
        var me = this;
        axios.get('/image').then(response => {
            me.images = response.data;
        });
    }
});

Vue.component('image-modal', {
    template: '#my-template',
    data: function() {
        return {
            
        };
    },
    props: ['id', 'title', 'description'],
    mounted: function() {
        console.log('id in components', this.id);
    },
    methods: {
        callImageModal: function(e) {
            // console.log('calling modal');
            // this.$emit('myImage', this.id, e.target.value);
        }
    }
});
Vue.component('image-modal', {
    template: '#my-template',
    data: function() {
        return {
            image: {}
        };
    },
    props: ['id', 'title', 'description', 'url', 'username'],
    mounted: function() {
        var me = this;
        console.log('id in components', this.id);
        
        axios.get(`/my-image/${this.id}`).then((res) => {
            console.log('res from axios.post.upload', res);
            me.image = res.data.image;
        }).catch((err) => console.log('error in post/upload', err));
    },
    methods: {
        callImageModal: function(e) {
            // console.log('calling modal');
            // this.$emit('myImage', this.id, e.target.value);
        }
    }
});
new Vue({
    el: '#main',
    data: {
        images: [],
        title: '',
        description: '',
        username: '',
        file: null
    },
    mounted: function() {
        var me = this;
        axios.get('/image').then(response => {
            me.images = response.data;
        });
    },
    methods: {
        handleClick: function(e) {
            e.preventDefault();
            console.log('this ', this.title);
            var fd = new FormData;
            fd.append('file', this.file);
            fd.append('title', this.title);
            fd.append('username', this.username);
            fd.append('description', this.description);
            
            var me = this;
            axios.post('/upload', fd). then((res) => {
                console.log('res from axios.post.upload', res);
                me.images.unshift(res.data.image);
            }).catch((err) => console.log('error in post/upload', err));
        },
        handleChange: function(e) {
            console.log("handleChange is happening!");
            console.log("e.target.files", e.target.files[0]);
            this.file = e.target.files[0];
        }
    }
});

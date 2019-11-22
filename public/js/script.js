new Vue({
    el: '#main',
    data: {
        images: [],
        title: '',
        description: '',
        username: '',
        file: null,
        selectedImage: null
    },
    mounted: function() {
        var me = this;

        axios.get('/image').then(res => {
            me.images = res.data;
        });
    },
    methods: {
        handleClick: function(e) {
            e.preventDefault();
            console.log('this ', this.title);
            var fd = new FormData();
            fd.append('file', this.file);
            fd.append('title', this.title);
            fd.append('username', this.username);
            fd.append('description', this.description);

            var me = this;
            axios
                .post('/upload', fd)
                .then(res => {
                    me.images.unshift(res.data.image);
                })
                .catch(err => console.log('error in post/upload', err));
        },
        handleChange: function(e) {
            this.file = e.target.files[0];
        },
        showModal: function(id) {
            this.selectedImage = id;
        },
        closeModal: function() {
            this.selectedImage = null;
        },
        loadMore: function(id) {
            var me = this;
            console.log('I am loading more images...');
            console.log(
                'last (loadMore) ID:',
                this.images[this.images.length - 1].id
            );

            axios
                .get(`/more/${this.images[this.images.length - 1].id}`)
                .then(res => {
                    console.log('front: axios get /more!');
                    // me.images = res.data.images;
                    // me.images.push(me.images);
                    console.log('res.data is', res.data);
                    res.data.forEach(element => this.images.push(element));
                });
        }
    }
});

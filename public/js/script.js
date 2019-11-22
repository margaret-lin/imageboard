Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD-MM-YYYY HH:mm:ss');
    }
});

new Vue({
    el: '#main',
    data: {
        images: [],
        title: '',
        description: '',
        username: '',
        file: null,
        selectedImage: location.hash.slice(1),
        showButton: true
    },
    mounted: function() {
        var me = this;

        axios.get('/image').then(res => {
            me.images = res.data;
        });

        window.addEventListener('hashchange', function() {
            me.selectedImage = location.hash.slice(1);
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
            location.hash = '';
        },
        loadMore: function() {
            axios
                .get(`/more/${this.images[this.images.length - 1].id}`)
                .then(res => {
                    res.data.images.forEach(element =>
                        this.images.push(element)
                    );

                    if (this.images.length >= res.data.count) {
                        this.showButton = false;
                    }
                });
        }
    }
});

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
            axios.post('/upload', fd).then((res) => {
                me.images.unshift(res.data.image);
            }).catch((err) => console.log('error in post/upload', err));
        },
        handleChange: function(e) {
            this.file = e.target.files[0];
        },
        showModal: function(id) {
            console.log('showmodal ID:', id);
            this.selectedImage = id;
        },
        closeModal: function() {
            console.log('im closing yo');
            //function executing
            this.selectedImage = null;
        }
    }
});

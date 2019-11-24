Vue.component('image-modal', {
    template: `#my-template`,
    data: function() {
        return {
            image: {},
            username: '',
            commentText: '',
            comments: []
        };
    },
    props: ['id'],
    mounted: function() {
        var me = this;

        axios
            .get(`/my-image/${this.id}`)
            .then(res => {
                me.image = res.data.images;
            })
            .catch(err => console.log('error in post/upload', err));

        axios.get(`/comment/${this.id}`).then(res => {
            me.comments = res.data.comments;
        });
    },
    watch: {
        id: function() {
            var me = this;

            axios
                .get(`/my-image/${this.id}`)
                .then(res => {
                    me.image = res.data.images;
                })
                .catch(err => console.log('error in post/upload', err));

            axios.get(`/comment/${this.id}`).then(res => {
                me.comments = res.data.comments;
            });
        }
    },
    methods: {
        closeImageModal: function(e) {
            //firing event
            this.$emit('close', this.id, e.target.value);
        },
        submitComment: function(e) {
            e.preventDefault();
            var imageModal = this;
            if (imageModal.username === '' || imageModal.commentText === '') {
                // console.log('imageModal username', imageModal.username);
                return false;
            }

            this.$emit('click', this.id, e.target.value);
            axios
                .post('/comment', {
                    username: imageModal.username,
                    commentText: imageModal.commentText,
                    imageId: imageModal.id
                })
                .then(res => {
                    imageModal.comments.unshift(res.data.comment);
                })
                .catch(err => console.log('error in post/comment', err));
        },
        deleteImage: function() {
            console.log('deleting....', this.id);

            axios
                .delete(`/my-image/${this.id}`)
                .then(() => {
                    console.log(
                        'deleting images frontend component: ',
                        this.id
                    );
                    this.$emit('image-deleted', this.id);
                })
                .catch(err =>
                    console.log('error in deleting image component', err)
                );
        }
    }
});

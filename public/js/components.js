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
    props: ['id', 'title', 'description', 'url', 'created_at', 'comment_text'],
    mounted: function() {
        var me = this;
        // console.log('id in components', this.id);

        axios
            .get(`/my-image/${this.id}`)
            .then(res => {
                // console.log('res from axios.get image', res);
                // console.log('me.image', me.image);
                me.image = res.data.images;
            })
            .catch(err => console.log('error in post/upload', err));

        axios.get(`/comment/${this.id}`).then(res => {
            // console.log('res from axios comment', res);
            // console.log('me.comments', this.comments);
            me.comments = res.data.comments;
        });
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
                    // console.log('res from axios comment', res);
                    // console.log('me.comment', this.comment);
                    imageModal.comments.unshift(res.data.comment);
                })
                .catch(err => console.log('error in post/comment', err));
        }
    }
});

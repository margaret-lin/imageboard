Vue.component('image-modal', {
    template: `#my-template`,
    data: function() {
        return {
            image: {}
        };
    },
    props: [
        'id',
        'title',
        'description',
        'url',
        'username',
        'created_at',
        'comment_text'
    ],
    mounted: function() {
        var me = this;
        console.log('id in components', this.id);

        axios
            .get(`/my-image/${this.id}`)
            .then(res => {
                console.log('res from axios.get image', res);
                console.log('me.image', me.image);
                me.image = res.data.images;
            })
            .catch(err => console.log('error in post/upload', err));

        axios.get(`/comment/${this.id}`).then(res => {
            console.log('res from axios comment', res);
            console.log('me.comment', this.comment);
            me.comment = res.data.comments;
        });
    },
    methods: {
        closeImageModal: function(e) {
            console.log('close modal');
            //firing event
            this.$emit('close', this.id, e.target.value);
        },
        submitComment: function(e) {
            var self = this;

            this.$emit('click', this.id, e.target.value);
            axios
                .post('/comment', {
                    username: self.username,
                    comment_text: self.comment_text,
                    id: self.id
                })
                .then(res => {
                    console.log('res from axios comment', res);
                    console.log('me.comment', this.comment);
                    self.comments.unshift(res.data.comment);
                })
                .catch(err => console.log('error in post/comment', err));
        }
    }
});

// Vue.component('comment-component', {
//     template: `#my-comment-template`,
//     data: function() {
//         return {
//             comment: {}
//         };
//     },
//     props: ['id', 'username', 'comment_text', 'created_at'],
//     mounted: function() {
//         var me = this;
//         console.log('id in components', this.id);

//         axios
//             .post('/comment')
//             .then(res => {
//                 console.log('res from axios comment', res);
//                 console.log('me.comment', me.comment);
//                 me.comment = res.data.comments;
//             })
//             .catch(err => console.log('error in post/comment', err));
//     },
//     methods: {
//         // closeImageModal: function(e) {
//         //     console.log('close modal');
//         //     //firing event
//         //     this.$emit('close', this.id, e.target.value);
//         // }
//     }
// });

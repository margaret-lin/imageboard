const express = require('express');
const app = express();
const db = require('./utils/db');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const { s3Url } = require('./config');

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static('./public'));
app.use(express.json());

app.get('/image', (req, res) => {
    db.getImage()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(err => console.log('err in get image', err));
});

app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    const { title, description, username } = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;

    db.uploadImage(title, description, username, imageUrl).then(({ rows }) => {
        console.log('image rows', rows);
        res.json({
            image: rows[0]
        });
    });
});

app.get('/my-image/:id', (req, res) => {
    let { id } = req.params;

    db.selectImage(id)
        .then(({ rows }) => {
            // console.log('images (rows)', rows[0]);
            res.json({
                images: rows[0]
            });
        })
        .catch(err => console.log('error in /my-image', err));
});

app.get('/comment/:imageId', (req, res) => {
    let { imageId } = req.params;

    db.getCommentsByImageId(imageId)
        .then(({ rows }) => {
            // console.log('comment rows', rows);
            res.json({
                comments: rows
            });
        })
        .catch(err => console.log('err in node get/comment', err));
});

app.post('/comment', (req, res) => {
    // console.log('POST /comment req body', req.body);

    db.createComment(req.body.username, req.body.commentText, req.body.imageId)
        .then(({ rows }) => {
            // console.log('comment rows', rows[0]);
            res.json({
                comments: rows[0]
            });
        })
        .catch(err => console.log('err in node post/comment', err));
});

app.get('/more/:lastId', (req, res) => {
    let { lastId } = req.params;

    console.log('Back-end working: get/load more');

    db.getMoreImages(lastId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(err => console.log('err in back: get /more', err));
});

app.listen(8080, () => console.log('Imageboard up and running...'));

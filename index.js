const express = require('express');
const app = express();
const db = require('./utils/db');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const {s3Url} = require('./config');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
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
    db.getImage().then(({ rows }) => {
        res.json(rows);
    }).catch((err) => console.log('err in get image', err));
});

app.post('/upload', uploader.single('file'), s3.upload, (req, res)=> {
    const {title, description, username} = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;


    db.uploadImage(
        title, description, username, imageUrl
    ).then(({rows}) => {
        console.log('image rows', rows);
        res.json({
            image: rows[0]
        });
    });
});

app.listen(8080, () => console.log('Imageboard up and running...'));
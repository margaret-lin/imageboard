var spicedPg = require('spiced-pg');
var db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/imageboard'
);

exports.getImage = function getImage() {
    return db.query('SELECT * FROM images ORDER BY id DESC LIMIT 6');
};

exports.uploadImage = function uploadImage(
    title,
    description,
    username,
    imageUrl
) {
    return db.query(
        'INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, username, imageUrl]
    );
};

exports.selectImage = function selectImage(id) {
    return db.query(
        'SELECT title, description, username, url, created_at FROM images WHERE id = $1',
        [id]
    );
};

exports.getCommentsByImageId = function getCommentsByImageId(imageId) {
    return db.query(
        'SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC',
        [imageId]
    );
};

exports.createComment = function createComment(username, commentText, imageId) {
    return db.query(
        'INSERT INTO comments (username, comment_text, image_id) VALUES ($1, $2, $3) RETURNING id',
        [username, commentText, imageId]
    );
};

exports.getMoreImages = function getMoreImages(lastId) {
    return db.query(
        'SELECT * FROM images WHERE id < $1 ORDER BY id DESC LIMIT 3',
        [lastId]
    );
};

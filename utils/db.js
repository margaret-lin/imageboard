var spicedPg = require('spiced-pg');
var db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/imageboard'
);

exports.getImage = function getImage() {
    return db.query('SELECT * FROM images ORDER BY created_at DESC');
};

exports.uploadImage = function uploadImage(title, description, username, imageUrl) {
    return db.query(
        'INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4) RETURNING *', 
        [title, description, username, imageUrl]
    );
};

exports.selectImage = function selectImage(id) {
    return db.query(
        'SELECT (title, description, username, url) FROM images WHERE id = $1',
        [id]
    );
};
/* eslint-disable indent */
var spicedPg = require('spiced-pg');
var db = spicedPg(
	process.env.DATABASE_URL ||
		'postgres:postgres:postgres@localhost:5432/imageboard'
);

exports.getImage = function getImage() {
	return db.query('SELECT * FROM image');
};

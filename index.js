/* eslint-disable indent */
const express = require('express');
const app = express();
const db = require('./utils/db');

app.use(express.static('./public'));

app.get('/image', (req, res) => {
	db.getImage().then(({ rows }) => {
		console.log('my data', rows);
		console.log('image url: ', rows[0].url);
		console.log('image title: ', rows[0].title);

		res.json(rows);
	});
});

app.listen(8080, () => console.log('Imageboard up and running...'));

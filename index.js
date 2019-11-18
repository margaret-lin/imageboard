/* eslint-disable indent */
const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/animals', (req, res) => {
	let animals = [
		{
			name: 'squid',
			emoji: '🦑'
		},
		{
			name: 'ewe',
			emoji: '🐑'
		}
	];

	res.json(animals);
});

app.listen(8080, () => console.log('Imageboard up and running...'));

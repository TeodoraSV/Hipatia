const express = require('express');

const Datastore = require('nedb');
const app = express();
require('dotenv').config();
const port=process.env.PORT || 3000;
app.listen(port, () => console.log('Starting server at ${port}'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  let username = request.body.username;
	let password = request.body.password;
    console.log('there is a request'); 
    console.log(username);
    console.log(username);   
    const data=request.body;
    const timestamp=Date.now();
    data.timestamp=timestamp;
    database.insert(data);
    response.json({
        status: "success",
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
/**app.post('/api', (request, response) => {
  const data = request.body;
  allData.push(data);
  response.json(allData);
  console.log(allData);*/
});
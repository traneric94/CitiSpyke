const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const mysql = require('mysql');
const axios = require('axios');

// App settings
app.use(express.static('public'))

//Configuration
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'password',
  database: 'bikes'
});

app.use(express.static('public'))

app.get('/', (request, res) => {

  res.sendFile(path.join(__dirname, './public/index.html'))
});


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})

function compare(a,b) {
  if (a.station_id < b.station_id)
    return -1;
  if (a.station_id > b.station_id)
    return 1;
  return 0;
}

app.get('/query', (req, res) => {

    let data = req.query

    connection.connect();

    let stations;

    console.log("Requesting data");
    connection.query(`SELECT * FROM bikes.bike_station_locations;`,
    function(err, rows, fields) {
      if (err) console.log(err);
      stations = rows.sort(compare);
    });

    connection.query(`SELECT station_id, num_bikes_available FROM bikes.bike_station_information ORDER BY date DESC LIMIT 310`, function(err, current_capacities, fields) {
      if (err) console.log(err)
      current_capacities = current_capacities.sort(compare)

      for (var i = 0; i < stations.length; i++) {
        stations[i].available = current_capacities[i].num_bikes_available
      }
      res.send(stations)
    });

    connection.end();
})

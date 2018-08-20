// server
const axios = require('axios');

  getLocation = () => {
    axios.get("https://gbfs.fordgobike.com/gbfs/es/station_information.json")
    .then( response => {
      window.LocationInfo = response.data
    }).catch( error => {
      console.log(error);
    });
  }

  getBikeInfo = () => {
    axios.get("https://gbfs.fordgobike.com/gbfs/en/station_status.json")
    .then((response) => {
      window.bikeInfo = response.data
    }).catch(function (error) {
      console.log(error);
    });
  }

// client side
document.addEventListener('DOMContentLoaded', () => {


});

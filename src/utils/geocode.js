const request = require('request')

const geocode = (address, callback) => {
  const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWVzZ3hycHpkcGF0Z2xiZW5zIiwiYSI6ImNsZGd5czF1bTAyOTE0MG1kN2t6dHhycnUifQ.rgiu2vu2CY7vHF9V_3TDuA&limit=1';
  request({url: geocodeURL, json: true}, (error, { body } = {}) => {
    try {
      if(body.features.length == 0){
        callback('Unable to find the given location.', undefined)
      } else {
        callback(undefined, {
          latitude: body.feautres[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    } catch (error) {
      callback('Unable to connect to location services', undefined)
    }
  })
};

module.exports = geocode

// Program #1
// Get co-ordinates of Los Angeles from Mapbox API.

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWVzZ3hycHpkcGF0Z2xiZW5zIiwiYSI6ImNsZGd5czF1bTAyOTE0MG1kN2t6dHhycnUifQ.rgiu2vu2CY7vHF9V_3TDuA&limit=1'
// request({url: geocodeURL, json: true}, (error, response) => {
//   try {
//     if(response.body.features.length == 0) {
//       console.log('Unable to find the given location')
//     } else {
//       console.log(response.body.features[0].center[0]); // Longitude
//       console.log(response.body.features[0].center[1]); // Latitude
//     }
//   } catch (e) {
//       console.log('Unable to connect to Weather API. Please check your internet connection')
//   } 
// })


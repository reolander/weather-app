const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=cc8068a3917f66acd1a9ed0f343904b6&query=' + latitude + ',' + longitude;
  console.log(url);
  request({url, json: true}, (error, { body }) => {
    try {
      if(response.body.error.info) {
        callback('Unable to find location. Please try another search.', undefined)
      } else {
        const temp = body.current.temp;
        const feelsLike = body.current.feelslike
        const weatherDescription = body.current.weather_description
        callback(undefined, weatherDescription + ". It is currently " + temp + " degrees out. It feels like " + feelsLike + " degrees out.")
      }
    } catch (error) {
      callback('Unable to connect to location services', undefined);
    }
  });
}

module.exports = forecast


// const url = 'http://api.weatherstack.com/current?access_key=cc8068a3917f66acd1a9ed0f343904b6&query=37.8267,-122.4233'
// const urlWithUnitsparam = 'http://api.weatherstack.com/current?access_key=cc8068a3917f66acd1a9ed0f343904b6&query=37.8267,-122.4233&units=f'
// const urlWithLocationName = 'http://api.weatherstack.com/current?access_key=cc8068a3917f66acd1a9ed0f343904b6&query=Hyderabad&units=m'
// request(url, (error, response, body) =>{
//   console.log(JSON.parse(body));
// });

// request takes 2 arguments. Options object & Callback function.
// We can parse JSON directly by enabling json: true option.
// Callback can take 'error, response, body' or just 'error, response'.
// request({ url, json: true }, (error, response, body) => {
//   console.log(error);
//   console.log(response.body.current);
//   // console.log(response.current);
//   console.log(typeof response)
// });

// Program #1
// request({ url, json: true}, (error, response) => {
//   try {
//     if (response.body.error.info) {
//       console.log(response.body.error)
//     } else {
//       const temp = response.body.current.temp;
//       const feelsLike = response.body.current.feelslike
//       const weatherDescription = response.body.current.weather_description
//       console.log(weatherDescription + ". It is currently " + temp + " degrees out. It feels like " + feelsLike + " degrees out.");
//     }
//   } catch (e) {
//     console.log('Unable to connect to Weather API. Please check your internet connection')
//   }
// });
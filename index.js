const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');





const exampleCoords = { lat: '43.7315479', lon: '-79.7624177' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});




// fetchCoordsByIP('99.234.196.45', (error, data) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! Returned data: ', data);
// });



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

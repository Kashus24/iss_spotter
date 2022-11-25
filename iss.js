/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org/?format=json`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};
  
 
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const divBody = JSON.parse(body);

    if (!divBody.success) {
      const message = `Success was ${divBody.success}. Server says: ${divBody.message} for IP ${divBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = divBody;
    callback(null, {latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`, (error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg =  `Status code ${response.statusCode} for ${body}`;
      callback(Error(msg), null);
      return;

    }


    const passes = JSON.parse(body).response;
    callback(null, passes);

  })
  /**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

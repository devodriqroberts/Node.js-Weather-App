
const request = require('request');


const getWeather = (coordinates, callback) => {

    const key = '';
    const lat = coordinates.latitude;
    const lon = coordinates.longitude;

    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
        json: true,
    }, (error, response, body) => {

        if (error) {

            callback("Error getting weather results.");
    
        } else if (!error && response.statusCode === 200){

            const toWhole = (num) => num * 100;

            callback(undefined, {
                summary: body.currently.summary,
                percipitationProb: toWhole(body.currently.precipProbability),
                temperature: parseInt(body.currently.temperature),
                humidity: toWhole(body.currently.humidity),
            });
    
        };
    });
};

module.exports = {
    getWeather,
};

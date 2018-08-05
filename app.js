
const yargs = require('yargs');

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather');
const today = require('./currentDate/currentDate');


const argv = yargs
.options({
    a: {
        alias: 'address',
        demand: true,
        describe: 'Address to fetch weather for.',
        string: true,
    }
})
.help()
.alias('help', 'h')
.argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        
        weather.getWeather(results, (errMessage, res) => {
            if (errMessage) {
                console.log(errMessage);
            } else {
                console.log('*******');
                console.log("");
                console.log(`Results for: ${results.address} on ${today.todayDate()}`)
                console.log("");
                console.log(`Current conditions: ${(res.summary)} with a ${res.percipitationProb}% chance of rain. Current temperature is ${res.temperature} degrees. Humidity is at ${res.humidity}%.`)
                //console.log(JSON.stringify(res, undefined, 2));
                console.log('*******');
            };
        });
    };
});
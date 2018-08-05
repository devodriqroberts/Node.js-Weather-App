
const yargs = require('yargs');
const axios = require('axios');


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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=%20${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZEOR_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    const key = '';
    let lat = response.data.results[0].geometry.location.lat;
    let lon = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lon}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
 }).then((response) => {
    const toWhole = (num) => num * 100;

    let temperature = response.data.currently.temperature;
    let summary = response.data.currently.summary;
    let humidity = toWhole(response.data.currently.humidity);
    let percipitationProb = toWhole(response.data.currently.precipProbability);

    console.log(`Current conditions: ${summary} with a ${percipitationProb}% chance of rain. Current temperature is ${temperature} degrees. Humidity is at ${humidity}%.`)

 }).catch ((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
    
});    



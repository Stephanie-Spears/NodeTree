const colors = require('colors');
const http = require('http');
const https = require('https');
const api = require('./api.json');


function printWeather(weather){
	weather.location.city = colors.blue(weather.location.city);
	weather.current_observation.temp_f = colors.magenta(weather.current_observation.temp_f);
	const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
	console.log(message);
}

function printError(error){
	console.error(colors.red(error.message));
}

function get(query){
	const readableQuery = query.replace('_', ' ');
	try {
		const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
			if (response.statusCode === 200) {
				let body = "";
				response.on('data', chunk => {    //read in data
					body += chunk;
				});
				response.on('end', () => { //parse and print data
					try {
						const weather = JSON.parse(body);
						if (weather.location) {//check location found before printing
							printWeather(weather);
						} else {
							const queryError = new Error(`The location "${readableQuery}" was not found.`);
							printError(queryError);
						}
					} catch (error) {
						printError(error);
					}
				});
			} else {
				const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
				printError(statusCodeError);
			}
		});
		request.on("error", printError);
	} catch(error){
		printError(error); //Malformed URL Error
	}

}

module.exports.get = get;
//handle events
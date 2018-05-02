const http = require('http');
const https = require('https');
const api = require('./api.json');


function printWeather(weather){
  const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
  console.log(message);
}

function printError(error){
  console.error(error.messages);
}

function get(query){
  const readableQuery = query.replace('_', ' ');
  try{
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
      if(response.statusCode === 200){
        let body = "";

        response.on('data', chunk => {    //read in data

          body += chunk;
        });
        response.on('end', () => { //parse and print data
          try{
            const weather = JSON.parse(body);
            printWeather(weather);

          }
        }


      });
    });
  }
  catch{

  }

}

module.exports.get = get;
//handle events
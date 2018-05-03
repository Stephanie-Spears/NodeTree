const colors = require('colors');
const https = require('https');
const http = require('http');//module for status codes


function printError(error){
  console.error(colors.red(error.message));
}

function printMessage(username, badgeCount, points){
  username = colors.magenta(username);
  badgeCount = colors.yellow(badgeCount);
  points = colors.cyan(points);
  const message = `\n${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript\n`;
  console.log(message);

  console.log(colors.rainbow('OMG Rainbow!'));
}


function get(username) {
  try {  //connect to the API URL
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

      if(response.statusCode === 200){
        let body = "";

        response.on('data', data => {// read the data

          body += data.toString();
        });

        response.on('end', () => {// parse data when finished transferring
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        });
      }
      else{
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });

    request.on('error', printError);
  } catch(error){
    printError(error);
  }
}

module.exports.get = get;//name of the api I want to be accessible

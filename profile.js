// const colors = require('colors');
//
// colors.setTheme({
//   sillyColor: 'rainbow',
//   inputColor: 'grey',
//   verboseColor: 'cyan',
//   promptColor: 'grey',
//   infoColor: 'green',
//   dataColor: 'grey',
//   helpColor: 'cyan',
//   warnColor: 'yellow',
//   debugColor: 'blue',
//   errorColor: 'red'
// });

// outputs red text
// console.log("this is an error".errorColor);

// outputs yellow text
// console.log("this is a warning".warnColor);




const https = require('https');

//module for status codes
const http = require('http');

//print error messages
function printError(error){
  console.error(error.message);
}

function printMessage(username, badgeCount, points){
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}


function get(username) {
  //connect to the API URL
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

      if(response.statusCode === 200){
        let body = "";

        // read the data
        response.on('data', data => {
          body += data.toString();
        });

        //parse the data when finished transferring
        response.on('end', () => {
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
//name of the api I want to be accessible
module.exports.get = get;
const https = require('https');
const username = "stephaniespears1";

function printMessage(username, badgeCount, points){
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
  //some comments
  console.dir(response);
  console.log(response.statusCode);
});
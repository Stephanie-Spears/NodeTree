const profile = require('./profile.js');
const users = process.argv.slice(2);
users.forEach(profile.get);

const weather = require('./weather');
const query = process.argv.slice(2).join("_").replace('_', ' ');
weather.get(query);



//process is the global object used to access the current version of node and arguments passed in the command line
//slice skips the first two elements, which are the node binary and the app.js file.
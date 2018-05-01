const profile = require('./profile.js');
const colors = require('colors');
const users = process.argv.slice(2);
users.forEach(profile.get);
console.log(colors.enable)

//process is the global object used to access the current version of node and arguments passed in the command line
//slice skips the first two elements, which are the node binary and the app.js file.
// Allows variable argument with argv
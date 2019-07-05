require('ylenv').load();
require('firebase').initializeApp(require('./src/util/assets/serviceAccount.js'));
module.exports = require('./src/main.js');
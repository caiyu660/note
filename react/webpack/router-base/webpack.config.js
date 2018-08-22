'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

var env = args.env;

var configs = {
    dev: require(path.join(__dirname, 'config/dev')),
    dist: require(path.join(__dirname, 'config/dist'))
}

module.exports = configs[env];
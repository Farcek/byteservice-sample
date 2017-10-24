var path = require('path');
var pkg = require('../package.json');
var env = "[stage name]";

var conf = {
    host: '',
    port: '',
    username: '',
    password: '',


    localRoot: path.join(__dirname, '../'),
    serverRoot: '/foo/baa/' + pkg.version,
};




module.exports = {
    host: conf.host,
    port: conf.port, // default 22
    username: conf.username,
    password: conf.password,
    serverRoot: conf.serverRoot,
    localRoot: conf.localRoot,
    patterns: [
        //config
        'config/default.js',
        'config/' + env + '.js',
        //
        //db migration
        'db/**/*.*',
        //
        //service.api
        'dist.service.api/server.js',
        //
        // solition
        'pm2.' + env + '.json', 'nginx.' + env + '.conf',
        'package.json', '.sequelizerc'
    ],
    commands: {
        before1: function(tool) {
            var build = tool.local('npm run build');
            //var build = tool.local('cd time-core && tsc');            
            //var build = tool.local('cd time-web && webpack');            
            return [build];
        },
        after: function(tool) {
            var cdRoot = "cd " + conf.serverRoot + ' && ';
            //var cdCore = "cd " + serverRoot + '/time-core && ';
            var npmInstall = tool.remote(cdRoot + 'npm install --production');
            var reload = tool.remote(cdRoot + 'pm2 startOrRestart pm2.' + env + '.json');
            return [npmInstall, reload];
        }
    }
};
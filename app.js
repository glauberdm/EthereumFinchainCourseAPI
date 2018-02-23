'use strict';

var
  SwaggerExpress = require('swagger-express-mw'),
  swaggerUi = require('swagger-ui-express'),
  host = require("os").hostname(),
  app = require('express')(),
  path = require('./util/path'),
  express = require('express'),
  pathModule = require('path');

module.exports = app; // for testing

let env = app.get('env');
let test = env === 'test';
if (!test) {
  require('dotenv').config()
}

global.config = {
  appRoot: __dirname, // required config
  providerUrl: process.env.PROVIDER_URL || 'https://ropsten.infura.io/glauberdm',
  tokenAddress: process.env.TOKEN_ADDRESS || '0xd14acb096a18fdf6915d21906f3926ba44bba1e3',
  path: path
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  // swagger-ui doc configuration 
  config.basePath = swaggerExpress.runner.swagger.basePath;
  config.swagger = swaggerExpress.runner.swagger;
  var docPath = path('/doc')
  app.use(docPath, swaggerUi.serve, swaggerUi.setup(config.swagger));

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (!test) {
    console.log(`Application started. http://${host}:${port}${docPath}`);
  }
});
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  // see https://github.com/lifegadget/ember-cli-bootstrap-sassy
  'ember-cli-bootstrap-sassy': {
    js: false
  },
  sourcemaps: {
    enabled: true,
    extensions: ['js']
  }
});

// file upload deps
app.import('vendor/jquery-ui/jquery.ui.widget.js');
app.import('bower_components/jquery.iframe-transport/jquery.iframe-transport.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');

// spinkit
app.import('bower_components/spinkit/css/spinners/1-rotating-plane.css');

module.exports = app.toTree();

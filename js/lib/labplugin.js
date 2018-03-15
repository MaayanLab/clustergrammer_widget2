var clustergrammer_widget2 = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'clustergrammer_widget2',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'clustergrammer_widget2',
          version: clustergrammer_widget2.version,
          exports: clustergrammer_widget2
      });
  },
  autoStart: true
};


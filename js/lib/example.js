var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var _ = require('underscore');
var d3 = require('d3');
var cgm_fun = require('clustergrammer');

// version 0.2.0

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var HelloModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'HelloModel',
        _view_name : 'HelloView',
        _model_module : 'clustergrammer_widget2',
        _view_module : 'clustergrammer_widget2',
        _model_module_version : '0.3.0',
        _view_module_version : '0.3.0',
        value : 'Hello World',
        network: ''
    })
});


// Custom View. Renders the widget model.
var HelloView = widgets.DOMWidgetView.extend({

    // render: function() {
    //     console.log('example.js *************');
    //     console.log('--------------');

    //     render_function();

    //     this.value_changed();
    //     this.model.on('change:value', this.value_changed, this);
    // },

    render: render_function,

    value_changed: function() {
        this.el.textContent = this.model.get('value');
    }
});

function render_function() {

  // generate unique id for each visualization
  var viz_number = String(Math.round(Math.random()*10000));
  var container_name = 'cgm_notebook_' + String(viz_number) ;
  if (d3.select('#'+container_name).empty() === false){
    var backup_number = String(Math.round(Math.random()*10000));
    container_name = container_name + backup_number;
  }

  // widget-subarea appears to be limited to a width of ~960px in nbviewer
  d3.select(this.el)
      .append('div')
      .classed('clustergrammer_widget', true)
      .attr('id', container_name)
      .style('width', '975px')
      .style('height', '800px');

  var inst_network_string = this.model.get('network');

  inst_network = JSON.parse(inst_network_string);

  console.log(inst_network)

  var about_string = "<a href='http://clustergrammer.readthedocs.io/clustergrammer_widget.html' target='_blank' ><img src='http://amp.pharm.mssm.edu/clustergrammer/static/img/clustergrammer_logo.png' style='width:130px; margin-left:-5px' alt='clustergrammer'></a>";

  // var hzome = ini_hzome();

  // cgm_model needs to be global
  cgm_model = this;

  var container_id = '#'+container_name;

  // define arguments object
  var args = {
      root: container_id,
      'network_data': inst_network,
      // 'about':about_string,
      // 'row_tip_callback':hzome.gene_info,
      // 'matrix_update_callback':matrix_update_callback,
      // 'cat_update_callback': cat_update_callback,
      'sidebar_width':135,
  };

  setTimeout(make_viz, 10, args);

}

function make_viz(args){

  cgm = cgm_fun(args);

  // check_setup_enrichr(cgm);

  console.log('DO NOT UPDATE MATRIX STRING WHEN MAKING VIZ')

}

module.exports = {
    HelloModel : HelloModel,
    HelloView : HelloView
};

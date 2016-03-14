jade.templates = jade.templates || {};
jade.templates['flow'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (flowNames, undefined) {
buf.push("<!--Created by fy on 15-12-30.\n-->");
// iterate flowNames
;(function(){
  var $$obj = flowNames;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var flow = $$obj[index];

buf.push("<div" + (jade.attr("id", 'flow-' + (index) + '', true, false)) + " class=\"timeline-item clearfix\"><div class=\"timeline-info\"><!--img(src=\"assets/avatars/avatar1.png\")--><i class=\"timeline-indicator icon-star-empty btn btn-success no-hover\"></i></div><div class=\"widget-box transparent\"><div class=\"widget-header widget-header-small hidden\"></div><div class=\"widget-body\"><div class=\"widget-main\">" + (jade.escape((jade_interp = flow.name) == null ? '' : jade_interp)) + "</div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var flow = $$obj[index];

buf.push("<div" + (jade.attr("id", 'flow-' + (index) + '', true, false)) + " class=\"timeline-item clearfix\"><div class=\"timeline-info\"><!--img(src=\"assets/avatars/avatar1.png\")--><i class=\"timeline-indicator icon-star-empty btn btn-success no-hover\"></i></div><div class=\"widget-box transparent\"><div class=\"widget-header widget-header-small hidden\"></div><div class=\"widget-body\"><div class=\"widget-main\">" + (jade.escape((jade_interp = flow.name) == null ? '' : jade_interp)) + "</div></div></div></div>");
    }

  }
}).call(this);
}.call(this,"flowNames" in locals_for_with?locals_for_with.flowNames:typeof flowNames!=="undefined"?flowNames:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
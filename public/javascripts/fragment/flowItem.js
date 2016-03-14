jade.templates = jade.templates || {};
jade.templates['flowItem'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (flowName) {
buf.push("<!--Created by fy on 15-12-25.\n游戏流程子项\n--><div class=\"timeline-item clearfix\"><div class=\"timeline-info\"><img src=\"assets/avatars/avatar1.png\"/><!--i.timeline-indicator.icon-food.btn.btn-success.no-hover--></div><div class=\"widget-box transparent\"><div class=\"widget-header widget-header-small hidden\"></div><div class=\"widget-body\"><div class=\"widget-main\">" + (jade.escape((jade_interp = flowName) == null ? '' : jade_interp)) + "</div></div></div></div>");}.call(this,"flowName" in locals_for_with?locals_for_with.flowName:typeof flowName!=="undefined"?flowName:undefined));;return buf.join("");
};
})();
jade.templates = jade.templates || {};
jade.templates['add'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action) {
buf.push("<!--Created by fy on 15-12-22.\n 新建房间--><div class=\"row\"><div class=\"col-xs-12\"><iframe id=\"myIframe\" name=\"myIframe\" width=\"0\" height=\"0\" style=\"display: none;\"></iframe><form id=\"addForm\"" + (jade.attr("action", '' + (action) + '', true, false)) + " method=\"post\" role=\"form\" target=\"myIframe\" class=\"form-horizontal\"><div class=\"form-group\"><label for=\"code\" class=\"col-sm-3 control-label no-padding-right\"> 房间号</label><div class=\"col-sm-9\"><input id=\"code\" type=\"number\" name=\"code\" placeholder=\"房间号\" class=\"col-xs-10 col-sm-5\"/></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"seatCount\" class=\"col-sm-3 control-label no-padding-right\"> 游戏人数</label><div class=\"col-sm-9\"><input id=\"seatCount\" type=\"number\" name=\"seatCount\" min=\"10\" max=\"18\" placeholder=\"必须在10-18之间\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div></form></div></div>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined));;return buf.join("");
};
})();
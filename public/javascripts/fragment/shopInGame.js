jade.templates = jade.templates || {};
jade.templates['shopInGame'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action) {
buf.push("<!--Created by fy on 15-12-22.\n 游戏中购买--><div class=\"row\"><div class=\"col-xs-12\"><iframe id=\"myIframe\" name=\"myIframe\" width=\"0\" height=\"0\" style=\"display: none;\"></iframe><form id=\"shopForm\" method=\"post\" role=\"form\"" + (jade.attr("action", '' + (action) + '', true, false)) + " target=\"myIframe\" class=\"form-horizontal\"><input id=\"submit\" type=\"submit\" class=\"hide\"/><div class=\"form-group\"><label for=\"code\" class=\"col-sm-3 control-label no-padding-right\"> 房间号</label><div class=\"col-sm-9\"><input id=\"memberCode\" type=\"number\" name=\"code\" placeholder=\"房间号\" maxlength=\"20\" class=\"col-xs-10 col-sm-5\"/></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"seat_code\" class=\"col-sm-3 control-label no-padding-right\"> 座位号</label><div class=\"col-sm-9\"><input id=\"seat_code\" type=\"number\" name=\"seat_code\" placeholder=\"请填写1-18之间的座位号\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"goodsName\" class=\"col-sm-3 control-label no-padding-right\">  商品名称</label><div class=\"col-sm-9\"><input id=\"goodsName\" type=\"text\" name=\"goodsName\" placeholder=\"关键词\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"sum\" class=\"col-sm-3 control-label no-padding-right\">  数量</label><div class=\"col-sm-9\"><input id=\"sum\" type=\"number\" name=\"sum\" placeholder=\"请正确填写数量\" value=\"1\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div></form></div></div>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined));;return buf.join("");
};
})();
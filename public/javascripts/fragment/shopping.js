jade.templates = jade.templates || {};
jade.templates['shopping'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-xs-12\"><iframe id=\"myIframe\" name=\"myIframe\" width=\"0\" height=\"0\" style=\"display: none;\"></iframe><form id=\"editForm\" method=\"post\" role=\"form\" target=\"myIframe\" class=\"form-horizontal\"><div class=\"form-group\"><label for=\"code\" class=\"col-sm-3 control-label no-padding-right\"> 房间号</label><div class=\"col-sm-9\"><input id=\"memberCode\" type=\"text\" name=\"code\" placeholder=\"房间号\" maxlength=\"20\" class=\"col-xs-10 col-sm-5\"/></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"member_id\" class=\"col-sm-3 control-label no-padding-right\"> 购买人</label><div class=\"col-sm-9\"><input id=\"member_id\" type=\"text\" name=\"member_id\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"goods_id\" class=\"col-sm-3 control-label no-padding-right\">  商品</label><div class=\"col-sm-9\"><input id=\"goods_id\" type=\"text\" name=\"goods_id\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"sum\" class=\"col-sm-3 control-label no-padding-right\">  数量</label><div class=\"col-sm-9\"><input id=\"sum\" type=\"text\" name=\"sum\" class=\"col-xs-10 col-sm-5\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div></form></div></div>");;return buf.join("");
};
})();
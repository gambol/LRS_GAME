jade.templates = jade.templates || {};
jade.templates['addStorageInfo'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action) {
buf.push("<!--Created by fy on 15-12-22.\n 编辑商品信息--><div class=\"row\"><div class=\"col-xs-12\"><iframe id=\"myIframe\" name=\"myIframe\" width=\"0\" height=\"0\" style=\"display: none;\"></iframe><form id=\"stockForm\" method=\"post\" role=\"form\"" + (jade.attr("action", '' + (action) + '', true, false)) + " target=\"myIframe\" class=\"form-horizontal\"><input id=\"submit\" type=\"submit\" class=\"hide\"/><div class=\"form-group\"><label for=\"code\" class=\"col-sm-3 control-label no-padding-right\"> 商品名称</label><div class=\"col-sm-9\"><input id=\"code\" type=\"text\" name=\"code\" placeholder=\"输入关键词（商品编号或商品名）\" class=\"col-xs-12 col-sm-7\"/></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"bid\" class=\"col-sm-3 control-label no-padding-right\"> 进价</label><div class=\"col-sm-9\"><input id=\"bid\" type=\"number\" name=\"bid\" placeholder=\"进价为必填字段，且不能为负数\" class=\"col-xs-12 col-sm-7\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"bidSum\" class=\"col-sm-3 control-label no-padding-right\"> 入库数量</label><div class=\"col-sm-9\"><input id=\"bidSum\" type=\"text\" name=\"bidSum\" placeholder=\"入库数量为必填字段\" class=\"col-xs-12 col-sm-7\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"buyer\" class=\"col-sm-3 control-label no-padding-right\"> 采购人员</label><div class=\"col-sm-9\"><input id=\"buyer\" type=\"text\" name=\"buyer\" class=\"col-xs-12 col-sm-7\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"remark\" class=\"col-sm-3 control-label no-padding-right\"> 备注</label><div class=\"col-sm-9\"><input id=\"remark\" type=\"text\" name=\"remark\" class=\"col-xs-12 col-sm-7\"/><!--span.help-inline.col-xs-12.col-sm-7span.middle 请填写数字--></div></div><div class=\"space-4\"></div></form></div></div>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined));;return buf.join("");
};
})();
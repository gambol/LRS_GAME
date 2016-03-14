jade.templates = jade.templates || {};
jade.templates['open'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (action, judgments, offices, roomCode, roomId, undefined) {
buf.push("<!--Created by fy on 15-12-22.\n开间表单--><div class=\"row\"><div class=\"col-xs-12\"><form id=\"openForm\"" + (jade.attr("action", '' + (action) + '', true, false)) + " method=\"get\" role=\"form\" target=\"_top\" class=\"form-horizontal\"><input type=\"hidden\" name=\"roomId\"" + (jade.attr("value", '' + (roomId) + '', true, false)) + "/><input id=\"judgmentId\" type=\"hidden\" name=\"judgmentId\"" + (jade.attr("value", '' + (judgments[0].id) + '', true, false)) + "/><div class=\"form-group\"><label for=\"roomCode\" class=\"col-sm-3 control-label no-padding-right\">房间号</label><div class=\"col-sm-9\"><input type=\"text\" name=\"roomCode\" readonly=\"readonly\"" + (jade.attr("value", '' + (roomCode) + '', true, false)) + " class=\"col-xs-10 col-sm-5\"/></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"judgment\" class=\"col-sm-3 control-label no-padding-right\">裁判</label><div class=\"col-sm-9\"><select name=\"judgment\" onchange=\"document.getElementById(&quot;judgmentId&quot;).value=this.value\" class=\"col-xs-10 col-sm-5\">");
// iterate judgments
;(function(){
  var $$obj = judgments;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var jm = $$obj[$index];

buf.push("<option" + (jade.attr("value", '' + (jm.id) + '', true, false)) + ">" + (jade.escape((jade_interp = jm.realName) == null ? '' : jade_interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var jm = $$obj[$index];

buf.push("<option" + (jade.attr("value", '' + (jm.id) + '', true, false)) + ">" + (jade.escape((jade_interp = jm.realName) == null ? '' : jade_interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"office\" class=\"col-sm-3 control-label no-padding-right\">游戏局</label><div class=\"col-sm-9\"><select name=\"office\" class=\"col-xs-10 col-sm-5\">");
// iterate offices
;(function(){
  var $$obj = offices;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var o = $$obj[index];

buf.push("<option" + (jade.attr("value", '' + (index + 1) + '', true, false)) + ">" + (jade.escape((jade_interp = o) == null ? '' : jade_interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var o = $$obj[index];

buf.push("<option" + (jade.attr("value", '' + (index + 1) + '', true, false)) + ">" + (jade.escape((jade_interp = o) == null ? '' : jade_interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><div class=\"space-4\"></div><div class=\"form-group\"><label for=\"type\" class=\"col-sm-3 control-label no-padding-right\"> 游戏类型</label><div class=\"col-sm-9\"><select name=\"type\" class=\"col-xs-10 col-sm-5\"><option value=\"常规赛\">常规赛</option><option value=\"月度赛\">月度赛</option><option value=\"年度赛\">年度赛</option></select></div></div><div class=\"space-4\"></div></form></div></div>");}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined,"judgments" in locals_for_with?locals_for_with.judgments:typeof judgments!=="undefined"?judgments:undefined,"offices" in locals_for_with?locals_for_with.offices:typeof offices!=="undefined"?offices:undefined,"roomCode" in locals_for_with?locals_for_with.roomCode:typeof roomCode!=="undefined"?roomCode:undefined,"roomId" in locals_for_with?locals_for_with.roomId:typeof roomId!=="undefined"?roomId:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
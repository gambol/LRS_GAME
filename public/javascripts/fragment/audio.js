jade.templates = jade.templates || {};
jade.templates['audio'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (audios, undefined) {
buf.push("<!--Created by fy on 15-12-28.\n 声音播放列表--><div style=\"overflow:auto;max-height:200px;\"><div><label for=\"tt\">请输入需要播放的文字</label><textarea id=\"tt\" style=\"overflow: hidden; word-wrap: break-word; resize: horizontal; height: 50px;\" class=\"autosize-transition form-control\"></textarea><button type=\"button\" onclick=\"javascript:play(document.getElementById(&quot;tt&quot;).value)\" class=\"btn btn-sm btn-success\">播放<i class=\"icon-arrow-right icon-on-right bigger-110\"></i></button></div><hr/><ul id=\"tasks\" class=\"item-list\">");
// iterate audios
;(function(){
  var $$obj = audios;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var audio = $$obj[$index];

buf.push("<li class=\"item-red clearfix\"><label class=\"inline\"><span class=\"lbl\">" + (jade.escape(null == (jade_interp = audio.text) ? "" : jade_interp)) + "</span></label><div class=\"pull-right action-buttons\"><a" + (jade.attr("href", 'javascript:Play.other("' + (audio.key) + '")', true, false)) + " class=\"blue\"><i class=\"icon-bullhorn bigger-130\"></i></a><span class=\"vbar\"></span></div></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var audio = $$obj[$index];

buf.push("<li class=\"item-red clearfix\"><label class=\"inline\"><span class=\"lbl\">" + (jade.escape(null == (jade_interp = audio.text) ? "" : jade_interp)) + "</span></label><div class=\"pull-right action-buttons\"><a" + (jade.attr("href", 'javascript:Play.other("' + (audio.key) + '")', true, false)) + " class=\"blue\"><i class=\"icon-bullhorn bigger-130\"></i></a><span class=\"vbar\"></span></div></li>");
    }

  }
}).call(this);

buf.push("</ul></div>");}.call(this,"audios" in locals_for_with?locals_for_with.audios:typeof audios!=="undefined"?audios:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
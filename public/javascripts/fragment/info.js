jade.templates = jade.templates || {};
jade.templates['info'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (infos, undefined) {
buf.push("<!--Created by fy on 15-12-29.\n用户基本信息面板\n-->");
// iterate infos
;(function(){
  var $$obj = infos;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var info = $$obj[$index];

buf.push("<ul id=\"psersonInfo\" class=\"item-list\">");
if ( info.memberCode)
{
buf.push("<li class=\"item-blue clearfix\"><label class=\"inline\"><span class=\"lbl\">账号：" + (jade.escape((jade_interp = info.memberCode) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.memberName)
{
buf.push("<li class=\"item-blue clearfix\"><label class=\"inline\"><span class=\"lbl\">姓名：" + (jade.escape((jade_interp = info.memberName) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.shenfen)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">身份：" + (jade.escape((jade_interp = info.shenfen) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.sex)
{
buf.push("<li class=\"item-grey clearfix\"><label class=\"inline\"><span class=\"lbl\">性别： " + (jade.escape((jade_interp = info.sex) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.penalty)
{
buf.push("<li class=\"item-green clearfix\"><label class=\"inline\"><span class=\"lbl\">罚分：" + (jade.escape((jade_interp = info.penalty) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( typeof info.status != 'undefined')
{
buf.push("<p>" + (jade.escape((jade_interp = info.status) == null ? '' : jade_interp)) + "</p>");
// iterate info.status
;(function(){
  var $$obj = info.status;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var status = $$obj[$index];

if ( (status == 1))
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 被巫师救活</span></label></li>");
}
if ( status == 2)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：公投出局</span></label></li>");
}
if ( status == 3)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：误睁眼出局</span></label></li>");
}
if ( status == 4)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：被狼杀</span></label></li>");
}
if ( status == 5)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：爆狼</span></label></li>");
}
if ( status == 6)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：被女巫毒杀</span></label></li>");
}
if ( status == 7)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：猎人枪杀</span></label></li>");
}
if ( status == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 还活着</span></label></li>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var status = $$obj[$index];

if ( (status == 1))
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 被巫师救活</span></label></li>");
}
if ( status == 2)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：公投出局</span></label></li>");
}
if ( status == 3)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：误睁眼出局</span></label></li>");
}
if ( status == 4)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：被狼杀</span></label></li>");
}
if ( status == 5)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：爆狼</span></label></li>");
}
if ( status == 6)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：被女巫毒杀</span></label></li>");
}
if ( status == 7)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：猎人枪杀</span></label></li>");
}
if ( status == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 还活着</span></label></li>");
}
    }

  }
}).call(this);

}
if ( info.wuyaFlag == 1)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">被乌鸦标记</span></label></li>");
}
if ( info.jiuhuoCount == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">女巫的救活药用完了</span></label></li>");
}
if ( info.shasiCount == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">女巫的毒药用完了</span></label></li>");
}
if ( info.beiYanRen == 1)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">被预言家验人</span></label></li>");
}
if ( info.cunzhang)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">" + (jade.escape((jade_interp = info.cunzhang) == null ? '' : jade_interp)) + "</span></label></li>");
}
buf.push("</ul>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var info = $$obj[$index];

buf.push("<ul id=\"psersonInfo\" class=\"item-list\">");
if ( info.memberCode)
{
buf.push("<li class=\"item-blue clearfix\"><label class=\"inline\"><span class=\"lbl\">账号：" + (jade.escape((jade_interp = info.memberCode) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.memberName)
{
buf.push("<li class=\"item-blue clearfix\"><label class=\"inline\"><span class=\"lbl\">姓名：" + (jade.escape((jade_interp = info.memberName) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.shenfen)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">身份：" + (jade.escape((jade_interp = info.shenfen) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.sex)
{
buf.push("<li class=\"item-grey clearfix\"><label class=\"inline\"><span class=\"lbl\">性别： " + (jade.escape((jade_interp = info.sex) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( info.penalty)
{
buf.push("<li class=\"item-green clearfix\"><label class=\"inline\"><span class=\"lbl\">罚分：" + (jade.escape((jade_interp = info.penalty) == null ? '' : jade_interp)) + "</span></label></li>");
}
if ( typeof info.status != 'undefined')
{
buf.push("<p>" + (jade.escape((jade_interp = info.status) == null ? '' : jade_interp)) + "</p>");
// iterate info.status
;(function(){
  var $$obj = info.status;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var status = $$obj[$index];

if ( (status == 1))
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 被巫师救活</span></label></li>");
}
if ( status == 2)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：公投出局</span></label></li>");
}
if ( status == 3)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：误睁眼出局</span></label></li>");
}
if ( status == 4)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：被狼杀</span></label></li>");
}
if ( status == 5)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：爆狼</span></label></li>");
}
if ( status == 6)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：被女巫毒杀</span></label></li>");
}
if ( status == 7)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：猎人枪杀</span></label></li>");
}
if ( status == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 还活着</span></label></li>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var status = $$obj[$index];

if ( (status == 1))
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 被巫师救活</span></label></li>");
}
if ( status == 2)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：公投出局</span></label></li>");
}
if ( status == 3)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：误睁眼出局</span></label></li>");
}
if ( status == 4)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">死因：被狼杀</span></label></li>");
}
if ( status == 5)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：爆狼</span></label></li>");
}
if ( status == 6)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：被女巫毒杀</span></label></li>");
}
if ( status == 7)
{
buf.push("<li class=\"item-pink clearifx\"><label class=\"inline\"><span class=\"lbl\">死因：猎人枪杀</span></label></li>");
}
if ( status == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\"> 还活着</span></label></li>");
}
    }

  }
}).call(this);

}
if ( info.wuyaFlag == 1)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">被乌鸦标记</span></label></li>");
}
if ( info.jiuhuoCount == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">女巫的救活药用完了</span></label></li>");
}
if ( info.shasiCount == 0)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">女巫的毒药用完了</span></label></li>");
}
if ( info.beiYanRen == 1)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">被预言家验人</span></label></li>");
}
if ( info.cunzhang)
{
buf.push("<li class=\"item-pink clearfix\"><label class=\"inline\"><span class=\"lbl\">" + (jade.escape((jade_interp = info.cunzhang) == null ? '' : jade_interp)) + "</span></label></li>");
}
buf.push("</ul>");
    }

  }
}).call(this);
}.call(this,"infos" in locals_for_with?locals_for_with.infos:typeof infos!=="undefined"?infos:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
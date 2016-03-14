jade.templates = jade.templates || {};
jade.templates['ruzuoscreen'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (leftColumn, rightColumn, undefined) {
buf.push("<style>.infobox-icon i img {\n    width: 50px;\n    height: 50px;\n}\n\n.infobox-green {\n    background-color: whitesmoke;\n}\n\n.infobox {\n    width: 550px\n}\n\n.infobox > .infobox-data {\n    font-family: \"黑体\";\n    color: black;\n    min-width: 81px;\n}\n\n.infobox > .infobox-data > .infobox-content {\n    font-size: 13px;\n}\n\n.infobox > .stat.stat-success {\n    color: black;\n}\n\n.infobox > .stat.stat-success:before {\n    background-color: white;\n}\n\n.infobox > .stat.stat-success:after {\n    border-bottom-color: white;\n}\n\n.infobox > .infobox-data > .infobox-data-number {\n    font-size: 24px;;\n}\n\n.infobox-container {\n    margin-top: 18px;\n}\n\n.nicheng {\n    width: 98px;\n    overflow: hidden;\n    /*text-overflow:ellipsis;*/\n    /*white-space:nowrap;*/\n}\n\n.title {\n    font-family: \"黑体\";\n    font-size: 30px;\n    margin: 10px 0 0 0;\n    text-align: center;\n}\n\n.title img {\n    margin-top: -5px;\n    width: 70px;\n    height: 55px;\n}\n\n.row {\n    margin-left: 0;\n    margin-right: 0;\n}\n\n.gundong {\n    position: fixed;\n    bottom: 0px;\n    width: 100%;\n    font-size: 27px;\n    font-family: \"黑体\";\n    font-weight: bold;\n    color: black;\n    z-index: 9999;\n}</style><div class=\"gundong\"><marquee direction=\"left\" behavior=\"scroll\" onmouseover=\"this.stop()\" onmouseout=\"this.start()\">游戏中请将手机静音，不要随意出入，在局玩家不得离开房间，尊重玩家发言，不要有任何场外行为，良好的游戏环境需要靠大家一起来维护。</marquee></div><div class=\"row\"><div class=\"title\"><img src=\"/pictures/logo.png\"/>本局玩家列表</div><div class=\"col-sm-6 infobox-container\">");
// iterate leftColumn
;(function(){
  var $$obj = leftColumn;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var userInfo = $$obj[index];

buf.push("<div class=\"infobox infobox-green\"><div class=\"infobox-icon\"><!--头像--><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.touXiang) + "", true, false)) + "/>");
}
buf.push("</i></div><div class=\"infobox-data\"><!--会员号--><span" + (jade.attr("title", "" + (userInfo.huiYuan) + "", true, false)) + " class=\"infobox-data-number nicheng\">" + (jade.escape((jade_interp = userInfo.huiYuan) == null ? '' : jade_interp)) + "</span><!--身份--><!--if userInfo.shenFen--><!--    .infobox-content #{userInfo.shenFen}--></div><!--        座位--><div class=\"infobox-data zuowei\"><div class=\"infobox-content\">座位号</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.zuoWei) == null ? '' : jade_interp)) + "</span></div><!--        等级--><div class=\"infobox-data\"><div class=\"infobox-content\">等级</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.dengJi) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">本次得分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.jiFen) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">累计积分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.leiJiJiFen) == null ? '' : jade_interp)) + "</span></div>");
if ( userInfo.shenFen)
{
buf.push("<div class=\"infobox-icon\"><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.shenFen) + "", true, false)) + "/>");
}
buf.push("</i><!--.infobox-data.shenfen--><!--    .infobox-content 身份--><!--    img.infobox-data-number(src=\"#{userInfo.shenFen}\",style=\"width:80px\")--></div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var userInfo = $$obj[index];

buf.push("<div class=\"infobox infobox-green\"><div class=\"infobox-icon\"><!--头像--><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.touXiang) + "", true, false)) + "/>");
}
buf.push("</i></div><div class=\"infobox-data\"><!--会员号--><span" + (jade.attr("title", "" + (userInfo.huiYuan) + "", true, false)) + " class=\"infobox-data-number nicheng\">" + (jade.escape((jade_interp = userInfo.huiYuan) == null ? '' : jade_interp)) + "</span><!--身份--><!--if userInfo.shenFen--><!--    .infobox-content #{userInfo.shenFen}--></div><!--        座位--><div class=\"infobox-data zuowei\"><div class=\"infobox-content\">座位号</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.zuoWei) == null ? '' : jade_interp)) + "</span></div><!--        等级--><div class=\"infobox-data\"><div class=\"infobox-content\">等级</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.dengJi) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">本次得分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.jiFen) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">累计积分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.leiJiJiFen) == null ? '' : jade_interp)) + "</span></div>");
if ( userInfo.shenFen)
{
buf.push("<div class=\"infobox-icon\"><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.shenFen) + "", true, false)) + "/>");
}
buf.push("</i><!--.infobox-data.shenfen--><!--    .infobox-content 身份--><!--    img.infobox-data-number(src=\"#{userInfo.shenFen}\",style=\"width:80px\")--></div>");
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div><div class=\"col-sm-6 infobox-container\">");
// iterate rightColumn
;(function(){
  var $$obj = rightColumn;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var userInfo = $$obj[index];

buf.push("<div class=\"infobox infobox-green\"><div class=\"infobox-icon\"><!--头像--><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.touXiang) + "", true, false)) + "/>");
}
buf.push("</i></div><div class=\"infobox-data\"><!--会员号--><span" + (jade.attr("title", "" + (userInfo.huiYuan) + "", true, false)) + " class=\"infobox-data-number nicheng\">" + (jade.escape((jade_interp = userInfo.huiYuan) == null ? '' : jade_interp)) + "</span><!--身份--><!--if userInfo.shenFen--><!--    .infobox-content #{userInfo.shenFen}--></div><!--        座位--><div class=\"infobox-data zuowei\"><div class=\"infobox-content\">座位号</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.zuoWei) == null ? '' : jade_interp)) + "</span></div><!--        等级--><div class=\"infobox-data\"><div class=\"infobox-content\">等级</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.dengJi) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">本次得分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.jiFen) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">累计积分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.leiJiJiFen) == null ? '' : jade_interp)) + "</span></div>");
if ( userInfo.shenFen)
{
buf.push("<div class=\"infobox-icon\"><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.shenFen) + "", true, false)) + "/>");
}
buf.push("</i><!--.infobox-data.shenfen--><!--    .infobox-content 身份--><!--    img.infobox-data-number(src=\"#{userInfo.shenFen}\",style=\"width:80px\")--></div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var userInfo = $$obj[index];

buf.push("<div class=\"infobox infobox-green\"><div class=\"infobox-icon\"><!--头像--><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.touXiang) + "", true, false)) + "/>");
}
buf.push("</i></div><div class=\"infobox-data\"><!--会员号--><span" + (jade.attr("title", "" + (userInfo.huiYuan) + "", true, false)) + " class=\"infobox-data-number nicheng\">" + (jade.escape((jade_interp = userInfo.huiYuan) == null ? '' : jade_interp)) + "</span><!--身份--><!--if userInfo.shenFen--><!--    .infobox-content #{userInfo.shenFen}--></div><!--        座位--><div class=\"infobox-data zuowei\"><div class=\"infobox-content\">座位号</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.zuoWei) == null ? '' : jade_interp)) + "</span></div><!--        等级--><div class=\"infobox-data\"><div class=\"infobox-content\">等级</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.dengJi) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">本次得分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.jiFen) == null ? '' : jade_interp)) + "</span></div><div class=\"infobox-data jifen\"><div class=\"infobox-content\">累计积分</div><span class=\"infobox-data-number\">" + (jade.escape((jade_interp = userInfo.leiJiJiFen) == null ? '' : jade_interp)) + "</span></div>");
if ( userInfo.shenFen)
{
buf.push("<div class=\"infobox-icon\"><i>");
if ( userInfo.touXiang)
{
buf.push("<img" + (jade.attr("src", "" + (userInfo.shenFen) + "", true, false)) + "/>");
}
buf.push("</i><!--.infobox-data.shenfen--><!--    .infobox-content 身份--><!--    img.infobox-data-number(src=\"#{userInfo.shenFen}\",style=\"width:80px\")--></div>");
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div></div>");}.call(this,"leftColumn" in locals_for_with?locals_for_with.leftColumn:typeof leftColumn!=="undefined"?leftColumn:undefined,"rightColumn" in locals_for_with?locals_for_with.rightColumn:typeof rightColumn!=="undefined"?rightColumn:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
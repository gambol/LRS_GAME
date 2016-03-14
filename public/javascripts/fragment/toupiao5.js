jade.templates = jade.templates || {};
jade.templates['toupiao5'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (gongtouList, undefined) {
buf.push("<style>.beijing {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    z-index: -1;\n}\n\n.all {\n    font-family: \"华文琥珀\";\n    height: 350px;\n    width: 650px;\n    border-radius: 5px;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    margin-top: -175px;\n    margin-left: -325px;\n    text-align: center;\n    background: white;\n    opacity: 0.9;\n    -webkit-box-shadow: 0 0 10px 15px white;\n    -moz-box-shadow: 0 0 10px 15px white;\n    box-shadow: 0 0 10px 15px white;\n    font-weight: bold;\n}\n\n.wenzi {\n    font-size: 69px;\n    color: black;\n    /*text-shadow: 0px 0px 10px green, 0px 0px 20px #FFFF00, 0px 0px 40px blue;*/\n    text-shadow: 1px 1px 0 #CCC, 2px 2px 0 #CCC, 3px 3px 0 #444, 4px 4px 0 #444, 5px 5px 0 #444, 6px 6px 0 #f0f0f0;\n}\n\n.gundong {\n    position: fixed;\n    bottom: 0px;\n    width: 100%;\n    font-size: 27px;\n    font-family: \"黑体\";\n    font-weight: bold;\n    color: yellow;\n}</style><body><div class=\"gundong\"><marquee direction=\"left\" behavior=\"scroll\" onmouseover=\"this.stop()\" onmouseout=\"this.start()\">游戏中请将手机静音，不要随意出入，在局玩家不得离开房间，尊重玩家发言，不要有任何场外行为，良好的游戏环境需要靠大家一起来维护。</marquee></div><img src=\"/pictures/baitian.png\" class=\"beijing\"/>");
// iterate gongtouList
;(function(){
  var $$obj = gongtouList;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var user = $$obj[index];

buf.push("<div class=\"all\"><p class=\"wenzi\"><span>" + (jade.escape((jade_interp = user.zuoWei) == null ? '' : jade_interp)) + "</span>号玩家被公投，身份为白痴，继续游戏</p></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var user = $$obj[index];

buf.push("<div class=\"all\"><p class=\"wenzi\"><span>" + (jade.escape((jade_interp = user.zuoWei) == null ? '' : jade_interp)) + "</span>号玩家被公投，身份为白痴，继续游戏</p></div>");
    }

  }
}).call(this);

buf.push("</body>");}.call(this,"gongtouList" in locals_for_with?locals_for_with.gongtouList:typeof gongtouList!=="undefined"?gongtouList:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
})();
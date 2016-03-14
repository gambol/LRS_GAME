jade.templates = jade.templates || {};
jade.templates['langren'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined, userList) {
buf.push("<style>.beijing {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    z-index: -1;\n}\n\n.one {\n    font-family: \"华文琥珀\";\n    height: 350px;\n    width: 550px;\n    border-radius: 5px;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    margin-top: -175px;\n    margin-left: -275px;\n    text-align: center;\n    background: white;\n    opacity: 0.9;\n    -webkit-box-shadow: 0 0 10px 15px white;\n    -moz-box-shadow: 0 0 10px 15px white;\n    box-shadow: 0 0 10px 15px white;\n    color: black;\n    font-weight: bold;\n    /*text-shadow: 0px 0px 10px blue, 0px 0px 20px #fff, 0px 0px 40px green;*/\n    text-shadow: 1px 1px 0 #CCC, 2px 2px 0 #CCC, 3px 3px 0 #444, 4px 4px 0 #444, 5px 5px 0 #444, 6px 6px 0 #444;\n}\n\n.left {\n    float: left;\n    height: 100%;\n    width: 39%;\n    padding-top: 50px;\n}\n\n.left img {\n    width: 180px;\n    height: 180px;\n}\n\n.righttop {\n    float: right;\n    height: 50%;\n    width: 60%;\n    font-size: 90px;\n    padding-top: 30px;\n}\n\n.rightbottom {\n    float: left;\n    width: 59%;\n    overflow: hidden;\n    height: 50%;\n    font-size: 79px;\n    white-space: nowrap;\n}\n\n.gundong {\n    position: fixed;\n    bottom: 0px;\n    width: 100%;\n    font-size: 27px;\n    font-family: \"黑体\";\n    font-weight: bold;\n    color: yellow;\n}</style><body><div class=\"gundong\"><marquee direction=\"left\" behavior=\"scroll\" onmouseover=\"this.stop()\" onmouseout=\"this.start()\">游戏中请将手机静音，不要随意出入，在局玩家不得离开房间，尊重玩家发言，不要有任何场外行为，良好的游戏环境需要靠大家一起来维护。</marquee></div><img src=\"/pictures/heitian.png\" class=\"beijing\"/>");
// iterate userList
;(function(){
  var $$obj = userList;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var user = $$obj[index];

buf.push("<div class=\"one\"><!--头像--><div class=\"left\"><img" + (jade.attr("src", '' + (user.touXiang) + '', true, false)) + "/></div><!--座位号--><div class=\"righttop\">" + (jade.escape((jade_interp = user.zuoWei) == null ? '' : jade_interp)) + "</div><!--会员名--><div class=\"rightbottom\">" + (jade.escape((jade_interp = user.huiYuan) == null ? '' : jade_interp)) + "</div></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var user = $$obj[index];

buf.push("<div class=\"one\"><!--头像--><div class=\"left\"><img" + (jade.attr("src", '' + (user.touXiang) + '', true, false)) + "/></div><!--座位号--><div class=\"righttop\">" + (jade.escape((jade_interp = user.zuoWei) == null ? '' : jade_interp)) + "</div><!--会员名--><div class=\"rightbottom\">" + (jade.escape((jade_interp = user.huiYuan) == null ? '' : jade_interp)) + "</div></div>");
    }

  }
}).call(this);

buf.push("</body>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"userList" in locals_for_with?locals_for_with.userList:typeof userList!=="undefined"?userList:undefined));;return buf.join("");
};
})();
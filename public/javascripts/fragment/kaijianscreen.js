jade.templates = jade.templates || {};
jade.templates['kaijianscreen'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<!--Created by Administrator on 2016/1/21 0021.--><style>.gundong {\n    position: fixed;\n    bottom: 0px;\n    width: 100%;\n    font-size: 27px;\n    font-family: \"黑体\";\n    font-weight: bold;\n    background: white;\n    color: black;\n}</style><div class=\"gundong\"><marquee direction=\"left\" behavior=\"scroll\" onmouseover=\"this.stop()\" onmouseout=\"this.start()\">游戏中请将手机静音，不要随意出入，在局玩家不得离开房间，尊重玩家发言，不要有任何场外行为，良好的游戏环境需要靠大家一起来维护。</marquee></div>");;return buf.join("");
};
})();
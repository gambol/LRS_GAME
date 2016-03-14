jade.templates = jade.templates || {};
jade.templates['dahuaxiaoben'] = (function(){
  return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (day) {
buf.push("<!--Created by Administrator on 2016/2/2 0002.--><style>.beijing {\n    width: 60%;\n    height: 100%;\n    position: fixed;\n    top: 7%;\n    z-index: -1;\n    left: 20%;\n}\n\n.main-container:after {\n    background-color: #F7EEA3;\n}\n\n.day {\n    font-family: \"华文琥珀\";\n    font-size: 120px;\n    text-align: center;\n    /*text-shadow: -7px 2px 7px #006;*/\n    text-decoration: none;\n    color: rgb(255, 94, 0);\n    -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 5, 6, 1)));\n}</style><body><img src=\"/pictures/shenfen/1.jpg\" class=\"beijing\"/><div class=\"day\">第<span>" + (jade.escape((jade_interp = day) == null ? '' : jade_interp)) + "天</span></div></body>");}.call(this,"day" in locals_for_with?locals_for_with.day:typeof day!=="undefined"?day:undefined));;return buf.join("");
};
})();
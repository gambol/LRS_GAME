/**
 * Created by fy on 16-1-8.
 */
'use strict';


/**
 * 控制大屏幕对象
 * @type {{show: Function, hide: Function, showText: Function, showUserInfo: Function, clear: Function}}
 */
if (typeof require !== 'undefined') {
    window.NW = require('nw.gui');
}

var MyScreen = {
    show: function () {
        if (typeof NW === 'undefined') {
            return;
        }
        NW.Window.open('../screen', {toolbar: false}, function (new_win) {
        });
    },
    /**
     * 显示内容到大屏幕上
     * @param html
     */
    showText: function (html) {
        window.localStorage.setItem('_is_msg', 1);
        window.localStorage.setItem('_html', encodeURIComponent(html));
        //document.getElementById('target').innerHTML = html;
    },
    userInfoMap: [],
    showUserInfo: function (ele) {
        // do nothing
        // this.showText(jade.templates.info({infos: [Data.getAllData(ele)]}));
    },
    /**
     * 动态显示数据,demo
     */
    showUserInfoList1: function (data) {
        this.showText(jade.templates.screen2({userInfoList: data}));
    },
    /**
     * 显示独立页面,没传参数,demo
     */
    showscreen1: function () {
        this.showText(jade.templates.screen1());
    },
    showKaiJianScreen: function () {
        this.showText(jade.templates.kaijianscreen());
    },
    removeSeatForRuZuoScreen: function (zuoWei) {
        this.showRuzuoScreen({zuoWei: zuoWei, remove: true});
    },
    showRuzuoScreen: function (data) {
        var userInfo = window.sessionStorage.getItem("userInfo");
        if (userInfo == 'null' || userInfo == null) {

            userInfo = [{zuoWei: 1, dengJi: 0, jiFen: 0}, {
                zuoWei: 2,
                dengJi: 0,
                leiJiJiFen: 0,
                jiFen: 0
            }, {zuoWei: 3, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {zuoWei: 4, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {
                zuoWei: 5,
                dengJi: 0, leiJiJiFen: 0,
                jiFen: 0
            }, {zuoWei: 6, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {zuoWei: 7, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {
                zuoWei: 8,
                dengJi: 0, leiJiJiFen: 0,
                jiFen: 0
            }, {zuoWei: 9, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {zuoWei: 10, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {
                zuoWei: 11,
                dengJi: 0, leiJiJiFen: 0,
                jiFen: 0
            }, {zuoWei: 12, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {zuoWei: 13, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {
                zuoWei: 14,
                dengJi: 0,
                jiFen: 0
            }, {zuoWei: 15, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {zuoWei: 16, dengJi: 0, leiJiJiFen: 0, jiFen: 0}, {
                zuoWei: 17,
                dengJi: 0, leiJiJiFen: 0,
                jiFen: 0
            }, {zuoWei: 18, dengJi: 0, leiJiJiFen: 0, jiFen: 0}];
        } else {
            userInfo = JSON.parse(userInfo);
        }

        for (var i = 0; i < userInfo.length; i++) {
            var ui = userInfo[i];
            if (ui.zuoWei == data.zuoWei) {
                if (data.remove) { // 删除某个座位
                    userInfo[i] = {zuoWei: ui.zuoWei, dengJi: 0, leiJiJiFen: 0, jiFen: 0};
                } else { // 设置某个座位
                    userInfo[i] = data;
                }
            }
        }

        //console.log(userInfo);
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        var userInfoList = userInfo;//JSON.parse(window.sessionStorage.getItem("userInfo"));
        userInfoList = _.sortBy(userInfoList, function (item) {
            return item.zuoWei;
        });

        var tuple = _.partition(userInfoList, function (item) {
            return item.zuoWei <= 9;
        });

        var leftColumn = tuple[0];
        leftColumn = _.sortBy(leftColumn, function (item) {
            return item.zuoWei;
        });
        var rightColumn = tuple[1];
        rightColumn = _.sortBy(rightColumn, function (item) {
            return -item.zuoWei;
        });

        this.showText(jade.templates.ruzuoscreen({leftColumn: leftColumn, rightColumn: rightColumn}));
    },
    showLangren: function (data) {
        this.showText(jade.templates.langren({userList: data}));
    },
    showNvwu1: function (data) {
        this.showText(jade.templates.nvwu1({users: data}));
    },
    showNvwu2: function (data) {
        this.showText(jade.templates.nvwu2({usersList: data}));
    },
    showNvwu3: function (data) {
        this.showText(jade.templates.nvwu3({userList: data}));
    },
    showYuyanjia2: function (data) {
        this.showText(jade.templates.yuyanjia2({userList: data}));
    },
    showToupiao1: function (data) {
        data = _.filter(data, function (item) {
            return item.order !== 3;
        });
        this.showText(jade.templates.toupiao1({userList: data}));
    },
    showToupiao4: function () {
        this.showText(jade.templates.toupiao4());
    },
    showToupiao5: function (data) {
        this.showText(jade.templates.toupiao5({gongtouList: data}));
    },
    showToupiao8: function (data) {
        this.showText(jade.templates.toupiao8({userList: data}));
    },
    /**
     * 清理大屏幕
     */
    clear: function () {
        this.showText(jade.templates.dahuaxiaoben({day: Setting.getNowDay()}));
        /* return; // 不需要清理，默认显示一个屏幕
         window.localStorage.setItem('_is_msg', 1);
         window.localStorage.setItem('_html', '');
         setTimeout(function () {
         window.localStorage.removeItem('_is_msg');
         }, 600);*/
    },
    /**
     * 关闭大屏幕
     */
    close: function () {
        window.localStorage.setItem('_is_msg', 2);
    }
};

